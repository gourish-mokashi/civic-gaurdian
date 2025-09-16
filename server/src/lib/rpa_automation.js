function rpaAutomation(category) {
  if (
    category === "POTHOLE" ||
    category === "GARBAGE_OVERFLOW" ||
    category === "STRAY_ANIMALS" ||
    category === "TREE_FALLEN" ||
    category === "SEWER_BLOCKAGE" ||
    category === "WATER_LEAKAGE"
  ) {
    return "MUNICIPAL";
  } else if (category === "STREET_LIGHTS" || category === "POWER_OUTAGE") {
    return "ELECTRICITY";
  } else if (
    category === "NOISE_COMPLAINT" ||
    category === "THEFT" ||
    category === "ASSAULT" ||
    category === "TRAFFIC_SIGNAL_ISSUE"
  ) {
    return "POLICE";
  } else {
    return "OTHERS";
  }
}

export default rpaAutomation;
