const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push("cjs");

module.exports = defaultConfig;


//Da firebase blev opdateret her i slut August 2022, er der stadig en masse bugs som skaber problemer.