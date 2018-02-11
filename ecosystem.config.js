module.exports = {
    apps: [{
        name: "lanp medium",
        script: "./dist/index.js",
        watch: true,
        instances: 1,
        exec_mode: "cluster",
        "port": 3000,
        env: {
            "PORT": 3000,
            "NODE_ENV": "development",
        },
        env_production: {
            "PORT": 3000,
            "NODE_ENV": "production"
        }
    }]
}