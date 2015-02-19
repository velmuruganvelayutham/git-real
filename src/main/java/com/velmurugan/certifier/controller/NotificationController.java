package com.velmurugan.certifier.controller;

import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Handles requests for the application home page.
 */
@Controller
public class NotificationController {

	private static final Logger logger = LoggerFactory
			.getLogger(NotificationController.class);

	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/notifications", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		model.addAttribute("message", "Notifications are coming soon !.");
		return "notifications.";
	}

	@RequestMapping(value = "/settings", method = RequestMethod.GET)
	public String settings(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		model.addAttribute("message", "settings are coming soon !.");
		return "settings.";
	}

}
