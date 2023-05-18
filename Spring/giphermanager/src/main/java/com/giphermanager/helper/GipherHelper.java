package com.giphermanager.helper;

import java.lang.reflect.Type;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.giphermanager.exception.GipherNotCreatedException;
import com.giphermanager.external.model.GipherExternal;
import com.giphermanager.model.Gipher;
import com.giphermanager.service.GipherService;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;

@SuppressWarnings("unchecked")
@Component
public class GipherHelper {
	@Autowired
	GipherService gipherService;
	
	String api_key = "05yxpVqmKsWBi23QrdFu03SvbDwqj3u2";
	String limit = "24";
	String baseurl = "https://api.giphy.com/v1/gifs/search?api_key={0}&q={1}&limit={2}&offset=0&rating=G&lang=en";
	
	@SuppressWarnings("deprecation")
	public List<Gipher> getGipherFromExternalAPI(String userId,String query) throws GipherNotCreatedException {	 
	    Type listOfGipherExternal = new TypeToken<ArrayList<GipherExternal>>(){}.getType();
	    Gson gson = new Gson();
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response = restTemplate.exchange(MessageFormat.format(baseurl, api_key, query, limit), HttpMethod.GET,
				null, new ParameterizedTypeReference<String>() {
				});
		JsonObject jsonObject = new JsonParser().parse(response.getBody()).getAsJsonObject();
		List<GipherExternal> gipherExternal = (List<GipherExternal>) gson.fromJson(jsonObject.get("data").toString(), listOfGipherExternal);	
		return getGipherFromGipherExternal(userId,gipherExternal);
	}
	
	private List<Gipher> getGipherFromGipherExternal(String userId,List<GipherExternal> giphersExternal) throws GipherNotCreatedException{
		List<Gipher> giphers = new ArrayList<Gipher>();
		for(GipherExternal gipherExternal : giphersExternal) {
			Gipher gipher = new Gipher();
			gipher.setUserId(userId);
			gipher.setGipherId(gipherExternal.getId()+"_"+userId);
			gipher.setEmbedURL(gipherExternal.getEmbed_url());
			giphers.add(gipher);
		}
		return giphers;
		
	}
}
