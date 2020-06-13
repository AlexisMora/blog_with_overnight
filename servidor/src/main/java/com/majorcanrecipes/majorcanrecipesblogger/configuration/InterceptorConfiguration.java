/**
 * @author: Alexis Mora
 */
package com.majorcanrecipes.majorcanrecipesblogger.configuration;

import com.majorcanrecipes.majorcanrecipesblogger.handler.TokenInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;

@Configuration
@EnableWebMvc
public class InterceptorConfiguration implements WebMvcConfigurer {
    @Bean
    public TokenInterceptor getInterceptor() {
        return new TokenInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(getInterceptor()).addPathPatterns("/**").excludePathPatterns("/","//getPost");
    }
}
