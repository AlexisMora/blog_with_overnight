/**
 * @author: Alexis Mora
 */
package com.majorcanrecipes.majorcanrecipesblogger.handler;

import com.majorcanrecipes.majorcanrecipesblogger.manager.TokenManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class TokenInterceptor implements HandlerInterceptor {
    @Autowired
    TokenManager tokenManager;
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler){
        String authorization =  request.getHeader("Authorization");
        if (authorization == null){
            return true;
            //Esto no tendria que estar, ya que es un agujero de seguridad
        }
        String token = authorization.split(" ")[1];
        //Verificar Token
        String validatedToken = tokenManager.validateToken(token);
        System.out.println(validatedToken);
        return true;
    }
}
