//package server;
//
//import com.fastcgi.FCGIInterface;
//
//import java.util.logging.Logger;
//
//public class Server {
//    private final FCGIInterface fcgi;
//    private final RequestHandler handler;
//    private final Logger logger;
//
//    public Server(FCGIInterface fcgi, RequestHandler handler, Logger logger) {
//        this.fcgi = fcgi;
//        this.handler = handler;
//        this.logger = logger;
//    }
//
//    public void run() {
//        logger.info("Сервер запущен.");
//        while (fcgi.FCGIaccept() >= 0) {
//            long startTime = System.currentTimeMillis();
//            logger.info("Входящий запрос принят.");
//
//            try {
//                handler.requestHandle();
//            } catch (Exception e) {
//                logger.warning("Ошибка обработки запроса: " + e.getMessage());
//            } finally {
//                long duration = System.currentTimeMillis() - startTime;
//                logger.info("Обработка запроса завершена. Время: " + duration + " мс.");
//            }
//        }
//    }
//}
