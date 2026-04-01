/**
 * Unified monitoring script for production, development, and experimental modes.
 */

const runtimeEnvironment =
  process.env.MONITOR_ENV || process.env.NODE_ENV || "production";

const profiles = {
  production: {
    label: "Production",
    interval: 60000,
    alertThreshold: 80,
    metricsEndpoint: "http://localhost:8080/metrics",
    debugMode: false,
    verboseLogging: false,
    aiEnabled: false,
    cloudProviders: []
  },
  development: {
    label: "Development",
    interval: 5000,
    alertThreshold: 90,
    metricsEndpoint: "http://localhost:3000/metrics",
    debugMode: true,
    verboseLogging: true,
    aiEnabled: false,
    cloudProviders: []
  },
  experimental: {
    label: "Experimental",
    interval: 30000,
    alertThreshold: 75,
    metricsEndpoint: "http://localhost:9000/metrics",
    debugMode: true,
    verboseLogging: true,
    aiEnabled: true,
    mlModelPath: "./models/anomaly-detection.h5",
    cloudProviders: ["aws", "azure", "gcp"],
    predictiveWindow: 300
  }
};

const monitorConfig = profiles[runtimeEnvironment] || profiles.production;

function logBanner() {
  console.log("================================================");
  console.log(`DevOps Simulator - ${monitorConfig.label} Monitor`);
  console.log(`Metrics endpoint: ${monitorConfig.metricsEndpoint}`);
  console.log("================================================");
}

function generateUsage() {
  return {
    cpu: Math.random() * 100,
    memory: Math.random() * 100,
    disk: Math.random() * 100
  };
}

function logPrediction() {
  if (!monitorConfig.aiEnabled) {
    return;
  }

  const prediction = {
    cpu: Math.random() * 100,
    memory: Math.random() * 100,
    traffic: Math.random() * 1000,
    confidence: (Math.random() * 30 + 70).toFixed(2)
  };

  console.log("AI forecast:");
  console.log(
    `  CPU: ${prediction.cpu.toFixed(2)}% in ${monitorConfig.predictiveWindow}s`
  );
  console.log(`  Memory: ${prediction.memory.toFixed(2)}%`);
  console.log(`  Traffic: ${prediction.traffic.toFixed(0)} req/s`);
  console.log(`  Confidence: ${prediction.confidence}%`);

  if (prediction.cpu > monitorConfig.alertThreshold) {
    console.log("Predictive alert: pre-scaling recommended.");
  }
}

function checkSystemHealth() {
  const timestamp = new Date().toISOString();
  const usage = generateUsage();
  const maxUsage = Math.max(usage.cpu, usage.memory, usage.disk);

  if (monitorConfig.debugMode) {
    console.log(`\n[${timestamp}] Detailed health check`);
  } else {
    console.log(`[${timestamp}] Checking system health...`);
  }

  console.log(`CPU usage: ${usage.cpu.toFixed(2)}%`);
  console.log(`Memory usage: ${usage.memory.toFixed(2)}%`);
  console.log(`Disk usage: ${usage.disk.toFixed(2)}%`);

  if (runtimeEnvironment === "development") {
    console.log("Hot reload: active");
    console.log("Debug port: 9229");
    console.log("Source maps: enabled");
  }

  if (runtimeEnvironment === "experimental") {
    monitorConfig.cloudProviders.forEach((cloud) => {
      console.log(
        `${cloud.toUpperCase()} health: ${
          Math.random() > 0.1 ? "healthy" : "degraded"
        }`
      );
    });
  }

  logPrediction();

  if (maxUsage > monitorConfig.alertThreshold) {
    console.log("System status: warning");
  } else {
    console.log("System status: healthy");
  }

  if (monitorConfig.verboseLogging) {
    console.log(`Next check in ${monitorConfig.interval}ms`);
  }
}

logBanner();

if (monitorConfig.aiEnabled) {
  console.log(`Loading AI model: ${monitorConfig.mlModelPath}`);
}

console.log(`Monitoring interval: ${monitorConfig.interval}ms`);
console.log(`Environment profile: ${runtimeEnvironment}`);

setInterval(checkSystemHealth, monitorConfig.interval);
checkSystemHealth();

if (runtimeEnvironment === "development") {
  setInterval(() => {
    const memory = process.memoryUsage();
    console.log("\nMemory usage snapshot:");
    console.log(`RSS: ${(memory.rss / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Heap used: ${(memory.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  }, 30000);
}
