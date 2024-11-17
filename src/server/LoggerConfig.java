package server;

import java.util.logging.Level;
import java.util.logging.Logger;

public class LoggerConfig {
    public static Logger logger;

    public static Logger getLogger(String name) {
        logger = Logger.getLogger(name);
        logger.setLevel(Level.INFO);

        return logger;
    }
}