// AI Worker for WebLLM processing
// This runs WebLLM inference in a separate thread to avoid blocking the main UI

import { WebWorkerMLCEngineHandler } from "@mlc-ai/web-llm";

console.log("WebLLM Worker: Starting AI worker thread");

// Create the handler that manages WebLLM operations
const handler = new WebWorkerMLCEngineHandler();

// Listen for messages from the main thread
self.onmessage = (msg) => {
    try {
        handler.onmessage(msg);
    } catch (error) {
        console.error("WebLLM Worker: Error handling message:", error);
        // Send error back to main thread
        self.postMessage({
            type: "error",
            error: error.message,
            timestamp: Date.now()
        });
    }
};

// Handle worker errors
self.onerror = (error) => {
    console.error("WebLLM Worker: Worker error:", error);
    self.postMessage({
        type: "worker_error", 
        error: error.message,
        filename: error.filename,
        lineno: error.lineno,
        timestamp: Date.now()
    });
};

// Handle unhandled promise rejections
self.onunhandledrejection = (event) => {
    console.error("WebLLM Worker: Unhandled promise rejection:", event.reason);
    self.postMessage({
        type: "promise_error",
        error: event.reason?.toString() || "Unknown promise rejection",
        timestamp: Date.now()
    });
    event.preventDefault();
};

console.log("WebLLM Worker: Worker initialized and ready");