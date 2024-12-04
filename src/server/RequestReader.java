package server;

import com.fastcgi.FCGIInterface;

import java.io.InputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class RequestReader {
    public static String read() throws IOException {
        String contentLengthString = FCGIInterface.request.params.getProperty("CONTENT_LENGTH");
        int contentLength = (contentLengthString != null) ? Integer.parseInt(contentLengthString) : 0;

        if (contentLength > 0) {
            byte[] buffer = new byte[contentLength];
            InputStream in = System.in;
            int bytesRead = in.read(buffer, 0, contentLength);
            if (bytesRead == -1) {
                throw new IOException("No data received");
            }
            return new String(buffer, StandardCharsets.UTF_8);
        } else {
            throw new IOException("Content length not specified or zero");
        }
    }
}
