import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle, G, Line, Polyline, Rect, Text as SvgText } from "react-native-svg";

const CHART_WIDTH = 336;

function linePoints(values: number[], width: number, top: number, bottom: number, inset = 6) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(max - min, 1);
  return values.map((value, index) => {
    const x = inset + (index / Math.max(values.length - 1, 1)) * (width - inset * 2);
    const y = bottom - ((value - min) / range) * (bottom - top);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
}

function compactValue(value: number, suffix = "") {
  return `${value.toFixed(value >= 10 ? 0 : 1)}${suffix}`;
}

export function SyntheticSparkline({ values, color }: { values: number[]; color: string }) {
  return <View style={styles.sparkline}><Svg width={78} height={38} viewBox="0 0 78 38"><Polyline points={linePoints(values, 78, 5, 33, 2)} fill="none" stroke={color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" /></Svg></View>;
}

export function SyntheticPriceChart({ values, color, period }: { values: number[]; color: string; period: string }) {
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const points = linePoints(values, CHART_WIDTH, 18, 132);
  return <View style={styles.chartCard}><View style={styles.chartHeading}><View><Text style={styles.chartEyebrow}>ILLUSTRATIVE {period} VIEW</Text><Text style={styles.chartTitle}>Synthetic price path</Text></View><Text style={[styles.syntheticTag, { color }]}>SYNTHETIC</Text></View><Svg width="100%" height={158} viewBox={`0 0 ${CHART_WIDTH} 158`}><Line x1="0" y1="38" x2={CHART_WIDTH} y2="38" stroke="#E2E9EC" strokeWidth="1" /><Line x1="0" y1="85" x2={CHART_WIDTH} y2="85" stroke="#E2E9EC" strokeWidth="1" /><Line x1="0" y1="132" x2={CHART_WIDTH} y2="132" stroke="#E2E9EC" strokeWidth="1" /><Polyline points={points} fill="none" stroke={color} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" /><Circle cx={linePoints(values, CHART_WIDTH, 18, 132).split(" ").at(-1)?.split(",")[0]} cy={linePoints(values, CHART_WIDTH, 18, 132).split(" ").at(-1)?.split(",")[1]} r="4.5" fill={color} /><SvgText x="4" y="16" fontSize="9" fontWeight="700" fill="#718191">HIGH {compactValue(maximum)}</SvgText><SvgText x="4" y="151" fontSize="9" fontWeight="700" fill="#718191">LOW {compactValue(minimum)}</SvgText></Svg><View style={styles.axis}><Text style={styles.axisText}>START</Text><Text style={styles.axisText}>HAND-AUTHORED PATH</Text><Text style={styles.axisText}>LATEST</Text></View></View>;
}

export function SyntheticBarChart({ title, values, periods, color, unit }: { title: string; values: number[]; periods: readonly string[]; color: string; unit: "billions" | "dollars" }) {
  const height = 158;
  const chartBottom = 124;
  const max = Math.max(...values.map((value) => Math.abs(value)), 1);
  const zeroY = values.some((value) => value < 0) ? 82 : chartBottom;
  const positiveSpace = values.some((value) => value > 0) ? zeroY - 16 : 0;
  const negativeSpace = values.some((value) => value < 0) ? chartBottom - zeroY : 0;
  const gap = 13;
  const barWidth = (CHART_WIDTH - 34 - gap * (values.length - 1)) / values.length;

  return <View style={styles.chartCard}><View style={styles.chartHeading}><View><Text style={styles.chartEyebrow}>ILLUSTRATIVE FINANCIAL SERIES</Text><Text style={styles.chartTitle}>{title}</Text></View><Text style={[styles.syntheticTag, { color }]}>SYNTHETIC</Text></View><Svg width="100%" height={height} viewBox={`0 0 ${CHART_WIDTH} ${height}`}><Line x1="0" y1={zeroY} x2={CHART_WIDTH} y2={zeroY} stroke="#CDD9DE" strokeWidth="1" />{values.map((value, index) => { const x = 17 + index * (barWidth + gap); const magnitude = Math.abs(value) / max; const barHeight = value >= 0 ? magnitude * positiveSpace : magnitude * negativeSpace; const y = value >= 0 ? zeroY - barHeight : zeroY; const label = unit === "billions" ? `$${compactValue(value)}B` : `$${compactValue(value)}`; return <G key={`${title}-${periods[index]}`}><Rect x={x} y={y} width={barWidth} height={barHeight} rx="4" fill={value >= 0 ? color : "#D9544D"} opacity="0.9" /><SvgText x={x + barWidth / 2} y={value >= 0 ? Math.max(12, y - 5) : Math.min(height - 22, y + barHeight + 13)} textAnchor="middle" fontSize="9" fontWeight="700" fill="#526276">{label}</SvgText><SvgText x={x + barWidth / 2} y="148" textAnchor="middle" fontSize="8" fontWeight="700" fill="#718191">{periods[index].replace("FY ", "")}</SvgText></G>; })}</Svg><Text style={styles.chartCaption}>{unit === "billions" ? "Illustrative dollars in billions" : "Illustrative earnings per share"}</Text></View>;
}

export function SyntheticMarginChart({ values, periods, color }: { values: number[]; periods: readonly string[]; color: string }) {
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const points = linePoints(values, CHART_WIDTH, 24, 118, 28);
  return <View style={styles.chartCard}><View style={styles.chartHeading}><View><Text style={styles.chartEyebrow}>ILLUSTRATIVE PROFITABILITY SERIES</Text><Text style={styles.chartTitle}>Operating margin trend</Text></View><Text style={[styles.syntheticTag, { color }]}>SYNTHETIC</Text></View><Svg width="100%" height={150} viewBox={`0 0 ${CHART_WIDTH} 150`}><Line x1="24" y1="42" x2={CHART_WIDTH - 10} y2="42" stroke="#E2E9EC" strokeWidth="1" /><Line x1="24" y1="80" x2={CHART_WIDTH - 10} y2="80" stroke="#E2E9EC" strokeWidth="1" /><Line x1="24" y1="118" x2={CHART_WIDTH - 10} y2="118" stroke="#E2E9EC" strokeWidth="1" /><Polyline points={points} fill="none" stroke={color} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />{values.map((value, index) => { const x = 28 + (index / Math.max(values.length - 1, 1)) * (CHART_WIDTH - 56); const range = Math.max(maximum - minimum, 1); const y = 118 - ((value - minimum) / range) * 94; return <G key={`${periods[index]}-${value}`}><Circle cx={x} cy={y} r="4" fill="#FFFFFF" stroke={color} strokeWidth="2.5" /><SvgText x={x} y="140" textAnchor="middle" fontSize="8" fontWeight="700" fill="#718191">{periods[index].replace("FY ", "")}</SvgText></G>; })}<SvgText x="1" y="18" fontSize="9" fontWeight="700" fill="#718191">HIGH {compactValue(maximum, "%")}</SvgText><SvgText x="1" y="128" fontSize="9" fontWeight="700" fill="#718191">LOW {compactValue(minimum, "%")}</SvgText></Svg><Text style={styles.chartCaption}>Illustrative operating margin percentage</Text></View>;
}

const styles = StyleSheet.create({
  sparkline: { width: 78, height: 38, alignItems: "center", justifyContent: "center" },
  chartCard: { backgroundColor: "#FCFDFC", borderRadius: 18, borderWidth: 1, borderColor: "#E0E8EB", padding: 14, gap: 4, overflow: "hidden" },
  chartHeading: { flexDirection: "row", justifyContent: "space-between", gap: 8, alignItems: "flex-start" },
  chartEyebrow: { color: "#718191", fontSize: 9, lineHeight: 13, fontWeight: "800", letterSpacing: 0.65 },
  chartTitle: { color: "#10243E", fontSize: 16, lineHeight: 21, fontWeight: "800", marginTop: 1 },
  syntheticTag: { backgroundColor: "#F1F5F5", borderRadius: 999, paddingHorizontal: 7, paddingVertical: 4, fontSize: 9, fontWeight: "900", letterSpacing: 0.5, overflow: "hidden" },
  axis: { flexDirection: "row", justifyContent: "space-between", marginTop: -2 },
  axisText: { color: "#718191", fontSize: 8, fontWeight: "800", letterSpacing: 0.45 },
  chartCaption: { color: "#718191", fontSize: 10, lineHeight: 14, marginTop: -2 },
});
