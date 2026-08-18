import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";

function fileNameFor(title: string) {
  return `tradewise-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-study-plan.txt`;
}

export async function exportStudyPlan(title: string, content: string) {
  try {
    const filename = fileNameFor(title);
    if (Platform.OS === "web") {
      if (typeof document === "undefined") return { ok: false, message: "Browser download is unavailable in this preview." };
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      anchor.click();
      URL.revokeObjectURL(url);
      return { ok: true, message: "Study plan downloaded." };
    }

    if (!FileSystem.documentDirectory) return { ok: false, message: "Local storage is unavailable on this device." };
    const uri = `${FileSystem.documentDirectory}${filename}`;
    await FileSystem.writeAsStringAsync(uri, content, { encoding: FileSystem.EncodingType.UTF8 });
    if (!(await Sharing.isAvailableAsync())) return { ok: false, message: "Sharing is unavailable on this device." };
    await Sharing.shareAsync(uri, { dialogTitle: `Save ${title} study plan`, mimeType: "text/plain", UTI: "public.plain-text" });
    return { ok: true, message: "Study plan is ready to save or share." };
  } catch {
    return { ok: false, message: "Study-plan export could not be completed. Please try again." };
  }
}
