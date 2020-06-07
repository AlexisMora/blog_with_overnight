/**
 * @author: Alexis Mora
 */
package com.majorcanrecipes.majorcanrecipesblogger.manager;

import com.google.gson.Gson;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TokenManager {
    @Value("${jwt.secret}")
    private String SECRET_KEY;

    public String validateToken(String token) {
        System.out.println("Entra en el validate");
        System.out.println(SECRET_KEY);
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY.getBytes())
                .parseClaimsJws(token)
                .getBody();
        return new Gson().toJson(claims);

    }
}