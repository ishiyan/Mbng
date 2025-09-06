export function extractColorFromLightDark(color: string, isDarkMode: boolean): string {
  // Check if it's a light-dark() function
  const lightDarkMatch = color.match(/light-dark\(\s*([^,]+),\s*([^)]+)\s*\)/);

  if (lightDarkMatch) {
    const lightColor = lightDarkMatch[1].trim();
    const darkColor = lightDarkMatch[2].trim();
    return isDarkMode ? darkColor : lightColor;
  }

  // If it's not a light-dark() function, return the value as-is
  return color;
}
