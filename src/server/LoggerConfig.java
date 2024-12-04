package server;

import java.util.logging.Level;
import java.util.logging.Logger;

public class LoggerConfig {
    public static Logger log;

    public static Logger getLogger(String name) {
        log = Logger.getLogger(name);
        log.setLevel(Level.INFO);
        return log;
    }
}