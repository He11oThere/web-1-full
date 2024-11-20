//package server;
//
//import com.fastcgi.FCGIInterface;
//
//import java.util.logging.FileHandler;
//import java.util.logging.Logger;
//import java.util.logging.SimpleFormatter;
//
//public class Main {
//    private static final Logger logger = Logger.getLogger("Main");
//
//    static {
//        try {
//            String logFilePath = "/home/studs/s408859/Web/httpd-root/fcgi-bin/server.log";
//            FileHandler fileHandler = new FileHandler(logFilePath, true);
//            fileHandler.setFormatter(new SimpleFormatter());
//
//            logger.addHandler(fileHandler);
//            logger.setUseParentHandlers(false);
//        } catch (Exception e) {
//            logger.info("Ошибка инициализации logHandler: " + e.getMessage());
//        }
//    }
//
//    public static void main(String[] args) {
//        FCGIInterface fcgi = new FCGIInterface();
//        RequestHandler requestHandler = new RequestHandler(fcgi);
//
//        Server server = new Server(fcgi, requestHandler, logger);
//        server.run();
//    }
//}
