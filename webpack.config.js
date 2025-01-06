module.exports = {
    // Other configurations...
    resolve: {
      fallback: {
        vm: require.resolve("vm-browserify"),
        // "vm": require.resolve("vm-browserify")
        // "http": require.resolve("stream-http")
        "http": false
      }
    }
  };


  