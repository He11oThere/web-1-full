//package server;
//
//import com.fastcgi.*;
//import java.io.IOException;
//import java.nio.charset.StandardCharsets;
//import java.time.LocalDateTime;
//import java.util.Map;
//
//public class RequestHandler {
//    private final FCGIInterface fcgi;
//
//    public RequestHandler(FCGIInterface fcgi) {
//        this.fcgi = fcgi;
//    }
//
//    public void requestHandle() {
//        while (fcgi.FCGIaccept() >= 0) {
//            try {
//                String requestBody = readRequestBody();
//
//                Map<String, String> params = JsonParser.parse(requestBody);
//
//                int x = (int) params.get("x");
//                double y = (double) params.get("y");
//                int r = (int) params.get("r");
//
//                boolean result = Checker.isInArea(x, y, r);
//
//                String jsonResponse = String.format(
//                        ResponseTemplates.RESULT_JSON.getTemplate(),
//                        LocalDateTime.now(), LocalDateTime.now(), result);
//
//                JsonSender.sendJson(System.currentTimeMillis(), jsonResponse);
//
//            } catch (Exception e) {
//                String errorJson = String.format(
//                        ResponseTemplates.ERROR_JSON.getTemplate(),
//                        LocalDateTime.now(), e.getMessage());
//
//                JsonSender.sendJson(System.currentTimeMillis(), errorJson);
//            }
//        }
//    }
//
//    private static String readRequestBody() throws IOException {
//        FCGIInterface.request.inStream.fill();
//
//        int contentLength = FCGIInterface.request.inStream.available();
//        if (contentLength <= 0) {
//            return "";
//        }
//
//        byte[] rawData = new byte[contentLength];
//        int bytesRead = FCGIInterface.request.inStream.read(rawData, 0, contentLength);
//
//        if (bytesRead <= 0) {
//            throw new IOException("Ошибка чтения тела запроса");
//        }
//
//        return new String(rawData, 0, bytesRead, StandardCharsets.UTF_8);
//    }
//}
