import { StyleSheet, Text, View } from "react-native";
import Svg, { Line, Polyline, Rect } from "react-native-svg";

export function SyntheticScenarioChart({ prices, volumes, color }: { prices: number[]; volumes: number[]; color: string }) {
  const width = 336;
  const height = 180;
  const chartTop = 12;
  const chartBottom = 122;
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = Math.max(max - min, 1);
  const points = prices.map((price, index) => {
    const x = (index / (prices.length - 1)) * width;
    const y = chartBottom - ((price - min) / range) * (chartBottom - chartTop);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const maxVolume = Math.max(...volumes);

  return (
    <View style={styles.wrapper}>
      <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        <Line x1="0" y1="36" x2={width} y2="36" stroke="#E1E7EC" strokeWidth="1" />
        <Line x1="0" y1="79" x2={width} y2="79" stroke="#E1E7EC" strokeWidth="1" />
        <Line x1="0" y1="122" x2={width} y2="122" stroke="#E1E7EC" strokeWidth="1" />
        {volumes.map((volume, index) => {
          const barWidth = width / volumes.length - 4;
          const barHeight = (volume / maxVolume) * 35;
          const x = index * (width / volumes.length) + 2;
          return <Rect key={`${volume}-${index}`} x={x} y={171 - barHeight} width={barWidth} height={barHeight} rx="1.5" fill={color} opacity="0.22" />;
        })}
        <Polyline points={points} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
      <View style={styles.axisRow}><Text style={styles.axisText}>START</Text><Text style={styles.axisText}>SYNTHETIC PATH</Text><Text style={styles.axisText}>NOW</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { backgroundColor: "#FCFDFC", borderRadius: 16, borderWidth: 1, borderColor: "#E6EBEE", paddingHorizontal: 12, paddingTop: 8, overflow: "hidden" },
  axisRow: { flexDirection: "row", justifyContent: "space-between", marginTop: -2, paddingBottom: 10 },
  axisText: { color: "#7A8897", fontSize: 9, fontWeight: "800", letterSpacing: 0.55 },
});
