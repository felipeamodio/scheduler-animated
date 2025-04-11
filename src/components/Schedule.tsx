import { Plus, X } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Switch, Text, View } from "react-native";
import Animated, {
  FadeInDown,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";

const weekDays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;
const _spacing = 10;
const _borderRadius = 16;
const _startHour = 8;
const _damping = 14;
const _entering = FadeInDown.springify().damping(_damping);
const _exiting = FadeOut.springify().damping(_damping);
const _layout = LinearTransition.springify().damping(_damping);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function HourBlock({ block }: { block: number }) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: _borderRadius - _spacing,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: _spacing / 4,
        backgroundColor: colors.card,
      }}
    >
      <Text style={{ color: colors.text }}>
        {block > 9 ? block : `0${block}`}:00{" "}
        {block > 11 && block < 24 ? "PM" : "AM"}
      </Text>
    </View>
  );
}

function DayBlock() {
  const [hours, setHours] = useState([_startHour]);
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <Animated.View
      style={{
        gap: _spacing,
      }}
      entering={_entering}
      exiting={_exiting}
      layout={_layout}
    >
      {hours.map((hour, index) => (
        <Animated.View
          key={`hour-${hour}-${index}`}
          style={{ flexDirection: "row", alignItems: "center", gap: _spacing }}
          entering={_entering}
          exiting={_exiting}
          layout={_layout}
        >
          <Text style={{ color: colors.text }}>{t("from")}</Text>
          <HourBlock block={hour} />
          <Text style={{ color: colors.text }}>{t("to")}</Text>
          <HourBlock block={hour + 1} />
          <Pressable
            onPress={() => {
              console.log("Remove hour: ", hour);
              setHours((prev) => [...prev.filter((k) => k !== hour)]);
            }}
          >
            <View
              style={{
                backgroundColor: colors.secondary,
                height: 24,
                aspectRatio: 1,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: _borderRadius - _spacing,
              }}
            >
              <X size={14} color={colors.text} />
            </View>
          </Pressable>
        </Animated.View>
      ))}
      <AnimatedPressable
        layout={_layout}
        onPress={() => {
          if (hours.length === 0) {
            setHours([_startHour]);
            return;
          }
          setHours((prev) => [...prev, prev[prev.length - 1] + 1]);
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: _spacing / 2,
            padding: _spacing,
            borderRadius: _borderRadius - _spacing / 2,
            backgroundColor: colors.secondary,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: _spacing / 2,
          }}
        >
          <Plus size={18} color={colors.buttonText} />
          <Text style={{ fontSize: 14, color: colors.buttonText }}>
            {t("add_more")}
          </Text>
        </View>
      </AnimatedPressable>
    </Animated.View>
  );
}

function Day({ day }: { day: (typeof weekDays)[number] }) {
  const [isOn, setIsOn] = useState(false);
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <Animated.View
      style={{
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: _borderRadius,
        padding: _spacing,
        backgroundColor: isOn ? colors.cardBackground : colors.secondary,
        gap: _spacing,
      }}
      layout={_layout}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: colors.text }}>{t(day)}</Text>
        <Switch
          value={isOn}
          onValueChange={(value) => setIsOn(value)}
          trackColor={{ true: colors.switchTrack }}
          thumbColor={isOn ? "#FFFFFF" : "#F0F0F0"}
          style={{
            transformOrigin: ["100%", "50%", 0],
            transform: [
              {
                scale: 0.7,
              },
            ],
          }}
        />
      </View>
      {isOn && <DayBlock />}
    </Animated.View>
  );
}

export function Schedule() {
  const { colors } = useTheme();

  return (
    <View
      style={{
        padding: _spacing,
        gap: _spacing,
        backgroundColor: colors.background,
      }}
    >
      {weekDays.map((day) => (
        <Day day={day} key={`day-${day}`} />
      ))}
    </View>
  );
}
