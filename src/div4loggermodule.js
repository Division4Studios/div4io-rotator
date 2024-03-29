const Div4LoggerModule = (function () {

    // Define the module name
    const ModuleName = "Div4.io Rotator";

    // Define ANSI escape codes for log colors
    const Color = {
        RESET: '\x1b[0m',
        RED: '\x1b[31m',
        GREEN: '\x1b[32m',
        YELLOW: '\x1b[33m',
        BLUE: '\x1b[34m',
        GREY: '\x1b[90m',
        BG_BLACK: '\x1b[40m',
        BG_RED: '\x1b[41m',
        BG_GREEN: '\x1b[42m',
        BG_YELLOW: '\x1b[43m',
        BG_BLUE: '\x1b[44m',
        BG_WHITE: '\x1b[47m',
    };

    // Define log level colors
    const LogLevelColor = {
        DEBUG: Color.BLUE,
        INFO: Color.GREEN,
        WARN: Color.YELLOW,
        ERROR: Color.RED,
    };

    // Define a logging level enumeration for different log levels
    const LogLevel = {
        DEBUG: 'DEBUG',
        INFO: 'INFO',
        WARN: 'WARN',
        ERROR: 'ERROR',
        NONE: 'NONE',
    };

    function findIndex(valueToFind) {
        const keys = Object.keys(LogLevel);
        for (let i = 0; i < keys.length; i++) {
            if (LogLevel[keys[i]] === valueToFind) {
                return i;
            }
        }
        return -1; // If the value is not found
    }

    // Function to log messages with color-coded log level and sections
    function log(level, message, currentLogLevel = LogLevel.INFO) {
        if (findIndex(level) < findIndex(currentLogLevel)) {
            // Only log errors if the current log level allows it
            return;
        }
        // Customize the log format as needed
        const debugLine = `[${Color.GREY}${getCallerInfo()}${Color.RESET}]`;
        const timestamp = `[${Color.GREY}${new Date().toISOString()}${Color.RESET}]`;
        const logLevel = `[${LogLevelColor[level]}${level}${Color.RESET}]`;
        const logMessage = `${ModuleName} | ${Color.BG_BLACK}${timestamp} ${logLevel} ${debugLine} ${message}${Color.RESET}`;

        // Output the log message to the console
        console.log(logMessage);
    }

    function getCallerInfo() {
        try {
            throw new Error('Get caller info');
        } catch (error) {
            // Split the stack trace into lines
            const stackLines = error.stack.split('\n');
    
            // Extract the line with caller info
            const callerInfoLine = stackLines[3].trim();

    
            // Extract the file path and line number
            const lastIndexOfPath = callerInfoLine.lastIndexOf('/') + 1;
            const lastIndexColon = callerInfoLine.lastIndexOf(':');
            const filePathAndLine = callerInfoLine.slice(lastIndexOfPath, lastIndexColon);
    
            return `${filePathAndLine}`;
        }
    }

    log(LogLevel.INFO, "div4LoggerModule activated.");

    // Expose public functions and variables
    return {
        LogLevel: LogLevel,
        log: log
    };
})();

export default Div4LoggerModule; // This line is required to expose the module to other modules