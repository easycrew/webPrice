package cn.com.carsmart.ws.resource;

import javax.ws.rs.Path;

import cn.com.carsmart.ws.resource.BasePingResource;

import com.google.inject.servlet.RequestScoped;

@Path("ping")
@RequestScoped
public class PingResource extends BasePingResource {
}
