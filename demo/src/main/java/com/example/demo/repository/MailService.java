package com.example.demo.repository;


import com.example.demo.entity.BookMeetingRoom;
import com.example.demo.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;


@Service
public class MailService {


	private JavaMailSender javaMailSender;

	@Autowired
	public MailService(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}




	public void sendNotifyNotCheckin(String email,String tel) throws MailException, MessagingException {


		SimpleMailMessage mail = new SimpleMailMessage();
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		helper.setTo(email);
		helper.setFrom("Book Meeting Room Notify! <myemail>");
		helper.setSubject("แจ้งเตือนห้องประชุม");
		helper.setText("<html><head></head><body>" +
				"<font style=\'color: rgb(103,114,196);\' size=\"4\"><b>Dear</b></font><br>"+
				"<p>Time is out : You check in on time fail to. Please book again.</p><br>"+
				"<p></p><br><font>Book Meeting Room ILS</font><br>" +
				"<font style=\'color: rgb(0, 176, 80);\'><i><b>Logistics and Beyond</b></i></font><br>" +
				"<a href=\"https://www.youtube.com/watch?v=8UJFII55u48\">https://www.youtube.com/watch?v=8UJFII55u48</a><br>"+
				"<img src=\"http://www.ils.co.th/wp-content/themes/ils/images/logo.png\"><br>" +
				"<font style=\'color: rgb(0, 176, 80);\'><b>I.L.S. CO., LTD.</b> ( <i>Integrated Logistics Services</i> )</font><br>" +
				"<a href=\""+tel+"\">Tel." +" " +tel+"</a><br>"+
				"<a href=\"http://www.ils.co.th\">Website : http://www.ils.co.th</a><br>"+
				"</body>", true);

		javaMailSender.send(message);
	}

	public void sendNotify(String email,int time,String roomname,String tel) throws MailException, MessagingException {


		SimpleMailMessage mail = new SimpleMailMessage();
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		helper.setTo(email);
		helper.setFrom("Book Meeting Room Notify! <myemail>");
		helper.setSubject("แจ้งเตือนห้องประชุม");
		helper.setText("<html><head></head><body>" +
				"<font style=\'color: rgb(103,114,196);\' size=\"4\"><b>Dear</b></font><br>"+
				"<font>Your reserved meeting at "+roomname+" is starting in "+time +"minutes.</font><br>"+
				"<p></p><br><font>Book Meeting Room ILS</font><br>" +
				"<font style=\'color: rgb(0, 176, 80);\'><i><b>Logistics and Beyond</b></i></font><br>" +
				"<a href=\"https://www.youtube.com/watch?v=8UJFII55u48\">https://www.youtube.com/watch?v=8UJFII55u48</a><br>"+
				"<img src=\"http://www.ils.co.th/wp-content/themes/ils/images/logo.png\"><br>" +
				"<font style=\'color: rgb(0, 176, 80);\'><b>I.L.S. CO., LTD.</b> ( <i>Integrated Logistics Services</i> )</font><br>" +
				"<a href=\""+tel+"\">Tel." +" " +tel+"</a><br>"+
				"<a href=\"http://www.ils.co.th\">Website : http://www.ils.co.th</a><br>"+
				"</body>", true);

		javaMailSender.send(message);
	}


	public void sendEmail(Users user , BookMeetingRoom bookMeetingRoom) throws MailException, MessagingException {


		SimpleMailMessage mail = new SimpleMailMessage();
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		helper.setTo(user.getEmail());
		helper.setFrom("Book Meeting Room Notify! <myemail>");
		helper.setSubject("แจ้งการจองห้องประชุม");

		if(bookMeetingRoom.getRemark().equals("null")) {
			helper.setText("<html><head></head><body>" +
					"<font style=\'color: rgb(103,114,196);\' size=\"4\"><b>Dear K. "+user.getFirstname()+" "+user.getLastname()+"</b></font><br>"+
					"<font style=\'color: rgb(103,114,196); margin-left: 50px;\' size=\"4\"> <b>Book Detail</b></font><br>"+
					"<table border=\'1\' cellspacing=\'0\' style=\'margin-left: 50px;\'>" +
					"<tr><th style=\'background-color: rgb(255, 192, 0); text-align: right;\'>Meeting Room :</th>" +
					"<th style=\'background-color: white; text-align: left;\'>"+bookMeetingRoom.getRoomname().getRoomnames()+"</th></tr>" +
					"<tr><th style=\'background-color: rgb(255, 192, 0); text-align: right;\'>Time :</th>" +
					"<th style=\'background-color: white; text-align: left;\'>"+bookMeetingRoom.getStarttime()+" - "+bookMeetingRoom.getEndtime()+"</th></tr>" +
					"<tr><th style=\'background-color: rgb(255, 192, 0); text-align: right;\'>Topic :</th>" +
					"<th style=\'background-color:white; text-align: left;\'>"+bookMeetingRoom.getTopic()+"</th></tr>" +
					"<tr><th style=\'background-color: rgb(255, 192, 0); text-align: right;\'>Attendance :</th>" +
					"<th style=\'background-color:white; text-align: left;\'>"+bookMeetingRoom.getAttendees()+"</th></tr>" +
					"<tr><th style=\'background-color: rgb(255, 192, 0); text-align: right;\'>Tel. :</th>" +
					"<th style=\'background-color: white; text-align: left;\'>"+bookMeetingRoom.getTelbookingby()+"</th></tr>" +
					"</table>" +
					"<p></p><br><font>Book Meeting Room ILS</font><br>" +
					"<font style=\'color: rgb(0, 176, 80);\'><i><b>Logistics and Beyond</b></i></font><br>" +
					"<a href=\"https://www.youtube.com/watch?v=8UJFII55u48\">https://www.youtube.com/watch?v=8UJFII55u48</a><br>"+
					"<img src=\"http://www.ils.co.th/wp-content/themes/ils/images/logo.png\"><br>" +
					"<font style=\'color: rgb(0, 176, 80);\'><b>I.L.S. CO., LTD.</b> ( <i>Integrated Logistics Services</i> )</font><br>" +
					"<a href=\""+bookMeetingRoom.getTelbookingby()+"\">Tel." +" " +bookMeetingRoom.getTelbookingby()+"</a><br>"+
					"<a href=\"http://www.ils.co.th\">Website : http://www.ils.co.th</a><br>"+
					"</body>", true);
		}else{
			helper.setText("<html><head></head><body>" +
					"<font style=\'color: rgb(103,114,196);\' size=\"4\"><b>Dear K. "+user.getFirstname()+" "+user.getLastname()+"</b></font><br>"+
					"<font style=\'color: rgb(103,114,196); margin-left: 50px;\' size=\"4\"> <b>Book Detail</b></font><br>"+
					"<table border=\'1\' cellspacing=\'0\' style=\'margin-left: 50px;\'>" +
					"<tr><th style=\'background-color: rgb(255, 192, 0); text-align: right;\'>Meeting Room :</th>" +
					"<th style=\'background-color: white; text-align: left;\'>"+bookMeetingRoom.getRoomname().getRoomnames()+"</th></tr>" +
					"<tr><th style=\'background-color: rgb(255, 192, 0); text-align: right;\'>Time :</th>" +
					"<th style=\'background-color: white; text-align: left;\'>"+bookMeetingRoom.getStarttime()+" - "+bookMeetingRoom.getEndtime()+"</th></tr>" +
					"<tr><th style=\'background-color: rgb(255, 192, 0); text-align: right;\'>Topic :</th>" +
					"<th style=\'background-color:white; text-align: left;\'>"+bookMeetingRoom.getTopic()+"</th></tr>" +
					"<tr><th style=\'background-color: rgb(255, 192, 0); text-align: right;\'>Attendance :</th>" +
					"<th style=\'background-color:white; text-align: left;\'>"+bookMeetingRoom.getAttendees()+"</th></tr>" +
					"<tr><th style=\'background-color: rgb(255, 192, 0); text-align: right;\'>Remark. :</th>" +
					"<th style=\'background-color: white; text-align: left;\'>"+bookMeetingRoom.getRemark()+"</th></tr>" +
					"<tr><th style=\'background-color: rgb(255, 192, 0); text-align: right;\'>Tel. :</th>" +
					"<th style=\'background-color: white; text-align: left;\'>"+bookMeetingRoom.getTelbookingby()+"</th></tr>" +
					"</table>" +
					"<p></p><br><font>Book Meeting Room ILS</font><br>" +
					"<font style=\'color: rgb(0, 176, 80);\'><i><b>Logistics and Beyond</b></i></font><br>" +
					"<a href=\"https://www.youtube.com/watch?v=8UJFII55u48\">https://www.youtube.com/watch?v=8UJFII55u48</a><br>"+
					"<img src=\"http://www.ils.co.th/wp-content/themes/ils/images/logo.png\"><br>" +
					"<font style=\'color: rgb(0, 176, 80);\'><b>I.L.S. CO., LTD.</b> ( <i>Integrated Logistics Services</i> )</font><br>" +
					"<a href=\""+bookMeetingRoom.getTelbookingby()+"\">Tel." +" " +bookMeetingRoom.getTelbookingby()+"</a><br>"+
					"<a href=\"http://www.ils.co.th\">Website : http://www.ils.co.th</a><br>"+
					"</body>", true);
		}
		javaMailSender.send(message);
	}


	public void sendEmail2(Users user , BookMeetingRoom bookMeetingRoom, String email) throws MailException, MessagingException {


		SimpleMailMessage mail = new SimpleMailMessage();

		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		helper.setTo(email);
		helper.setFrom("Book Meeting Room Notify! <myemail>");
		helper.setSubject("แจ้งการจองห้องประชุม");

		if(bookMeetingRoom.getRemark().equals("null")){

			helper.setText("<html><head></head><body>" +
					"<font style=\'color: rgb(103,114,196);\' size=\"4\"><b>Dear K. "+user.getFirstname()+" "+user.getLastname()+"</b></font><br>"+
					"<font style=\'color: rgb(103,114,196); margin-left: 50px;\' size=\"4\"> <b>Book Detail</b></font><br>"+
					"<table border=\'1\' cellspacing=\'0\' style=\'margin-left: 50px;\'>" +
					"<tr><th style=\'background-color: rgb(255, 192, 0); text-align: right;\'>Meeting Room :</th>" +
					"<th style=\'background-color: white; text-align: left;\'>"+bookMeetingRoom.getRoomname().getRoomnames()+"</th></tr>" +
					"<tr><th style=\'background-color: rgb(255, 192, 0); text-align: right;\'>Time :</th>" +
					"<th style=\'background-color: white; text-align: left;\'>"+bookMeetingRoom.getStarttime()+" - "+bookMeetingRoom.getEndtime()+"</th></tr>" +
					"<tr><th style=\'background-color: rgb(255, 192, 0); text-align: right;\'>Topic :</th>" +
					"<th style=\'background-color:white; text-align: left;\'>"+bookMeetingRoom.getTopic()+"</th></tr>" +
					"<tr><th style=\'background-color: rgb(255, 192, 0); text-align: right;\'>Attendance :</th>" +
					"<th style=\'background-color:white; text-align: left;\'>"+bookMeetingRoom.getAttendees()+"</th></tr>" +
					"<tr><th style=\'background-color: rgb(255, 192, 0); text-align: right;\'>Tel. :</th>" +
					"<th style=\'background-color: white; text-align: left;\'>"+bookMeetingRoom.getTelbookingby()+"</th></tr>" +
					"</table>" +
					"<p></p><br><font>Book Meeting Room ILS</font><br>" +
					"<font style=\'color: rgb(0, 176, 80);\'><i><b>Logistics and Beyond</b></i></font><br>" +
					"<a href=\"https://www.youtube.com/watch?v=8UJFII55u48\">https://www.youtube.com/watch?v=8UJFII55u48</a><br>"+
					"<img src=\"http://www.ils.co.th/wp-content/themes/ils/images/logo.png\"><br>" +
					"<font style=\'color: rgb(0, 176, 80);\'><b>I.L.S. CO., LTD.</b> ( <i>Integrated Logistics Services</i> )</font><br>" +
					"<a href=\""+bookMeetingRoom.getTelbookingby()+"\">Tel." +" " +bookMeetingRoom.getTelbookingby()+"</a><br>"+
					"<a href=\"http://www.ils.co.th\">Website : http://www.ils.co.th</a><br>"+
					"</body>", true);

		}else{
			helper.setText("<html><head></head><body>" +
					"<font style=\'color: rgb(103,114,196);\' size=\"4\"><b>Dear K. "+user.getFirstname()+" "+user.getLastname()+"</b></font><br>"+
					"<font style=\'color: rgb(103,114,196); margin-left: 50px;\' size=\"4\"> <b>Book Detail</b></font><br>"+
					"<table border=\'1\' cellspacing=\'0\' style=\'margin-left: 50px;\'>" +
					"<tr><th style=\'background-color: rgb(255, 192, 0); text-align: right;\'>Meeting Room :</th>" +
					"<th style=\'background-color: white; text-align: left;\'>"+bookMeetingRoom.getRoomname().getRoomnames()+"</th></tr>" +
					"<tr><th style=\'background-color: rgb(255, 192, 0); text-align: right;\'>Time :</th>" +
					"<th style=\'background-color: white; text-align: left;\'>"+bookMeetingRoom.getStarttime()+" - "+bookMeetingRoom.getEndtime()+"</th></tr>" +
					"<tr><th style=\'background-color: rgb(255, 192, 0); text-align: right;\'>Topic :</th>" +
					"<th style=\'background-color:white; text-align: left;\'>"+bookMeetingRoom.getTopic()+"</th></tr>" +
					"<tr><th style=\'background-color: rgb(255, 192, 0); text-align: right;\'>Attendance :</th>" +
					"<th style=\'background-color:white; text-align: left;\'>"+bookMeetingRoom.getAttendees()+"</th></tr>" +
					"<tr><th style=\'background-color: rgb(255, 192, 0); text-align: right;\'>Remark. :</th>" +
					"<th style=\'background-color: white; text-align: left;\'>"+bookMeetingRoom.getRemark()+"</th></tr>" +
					"<tr><th style=\'background-color: rgb(255, 192, 0); text-align: right;\'>Tel. :</th>" +
					"<th style=\'background-color: white; text-align: left;\'>"+bookMeetingRoom.getTelbookingby()+"</th></tr>" +
					"</table>" +
					"<p></p><br><font>Book Meeting Room ILS</font><br>" +
					"<font style=\'color: rgb(0, 176, 80);\'><i><b>Logistics and Beyond</b></i></font><br>" +
					"<a href=\"https://www.youtube.com/watch?v=8UJFII55u48\">https://www.youtube.com/watch?v=8UJFII55u48</a><br>"+
					"<img src=\"http://www.ils.co.th/wp-content/themes/ils/images/logo.png\"><br>" +
					"<font style=\'color: rgb(0, 176, 80);\'><b>I.L.S. CO., LTD.</b> ( <i>Integrated Logistics Services</i> )</font><br>" +
					"<a href=\""+bookMeetingRoom.getTelbookingby()+"\">Tel." +" " +bookMeetingRoom.getTelbookingby()+"</a><br>"+
					"<a href=\"http://www.ils.co.th\">Website : http://www.ils.co.th</a><br>"+
					"</body>", true);

		}


		javaMailSender.send(message);
	}



}
