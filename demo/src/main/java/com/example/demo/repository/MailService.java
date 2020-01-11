package com.example.demo.repository;


import com.example.demo.entity.BookMeetingRoom;
import com.example.demo.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;


@Service
public class MailService {


	private JavaMailSender javaMailSender;

	@Autowired
	public MailService(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}




	public void sendNotifyNotCheckin(String email) throws MailException {


		SimpleMailMessage mail = new SimpleMailMessage();

		mail.setTo(email);
		mail.setSubject("แจ้งเตือนการจองห้องประชุม");

		mail.setText("คุณไม่ได้เช็คอินตามเวลาที่กำหนดเวลาที่จองของท่านถูกตัด");

		mail.setFrom("Book Meeting Room Notify! <myemail>");


		javaMailSender.send(mail);
	}

	public void sendNotify(String email,int time,String roomname) throws MailException {


		SimpleMailMessage mail = new SimpleMailMessage();

		mail.setTo(email);
		mail.setSubject("แจ้งเตือนการจองห้องประชุม");

		mail.setText("อีก " + time + " นาทีจะถึงเวลาเข้าห้องประชุมที่ห้อง "+roomname);

		mail.setFrom("Book Meeting Room Notify! <myemail>");


		javaMailSender.send(mail);
	}


	public void sendEmail(Users user , BookMeetingRoom bookMeetingRoom) throws MailException {


		SimpleMailMessage mail = new SimpleMailMessage();
		
		mail.setTo(user.getEmail());
		mail.setSubject("แจ้งการจองห้องประชุม");

		if(bookMeetingRoom.getRemark().equals("null")){

			mail.setText("คุณ " + user.getFirstname() + " " + user.getLastname() + "\nจองห้องประชุม " + bookMeetingRoom.getRoomname().getRoomnames()
					+ "\nเวลา "+bookMeetingRoom.getStarttime() + " - " +bookMeetingRoom.getEndtime() +"\nหัวข้อเรื่อง " + bookMeetingRoom.getTopic()+
					"\nจำนวน " + bookMeetingRoom.getAttendees() + " คน\n" + "เบอร์โทร " + bookMeetingRoom.getTelbookingby());
			mail.setFrom("Book Meeting Room Notify! <myemail>");

		}else{
			mail.setText("คุณ " + user.getFirstname() + " " + user.getLastname() + "\nจองห้องประชุม " + bookMeetingRoom.getRoomname().getRoomnames()
					+ "\nเวลา "+bookMeetingRoom.getStarttime() + " - " +bookMeetingRoom.getEndtime() +"\nหัวข้อเรื่อง " + bookMeetingRoom.getTopic()+
					"\nจำนวน " + bookMeetingRoom.getAttendees() + " คน\n" +"หมายเหตุ "+ bookMeetingRoom.getRemark() + "\nเบอร์โทร " + bookMeetingRoom.getTelbookingby());
			mail.setFrom("Book Meeting Room Notify! <myemail>");

		}


		javaMailSender.send(mail);
	}


	public void sendEmail2(Users user , BookMeetingRoom bookMeetingRoom, String email) throws MailException {


		SimpleMailMessage mail = new SimpleMailMessage();

		mail.setTo(email);
		mail.setSubject("แจ้งการจองห้องประชุม");

		if(bookMeetingRoom.getRemark().equals("null")){

			mail.setText("คุณ " + user.getFirstname() + " " + user.getLastname() + "\nจองห้องประชุม " + bookMeetingRoom.getRoomname().getRoomnames()
					+ "\nเวลา "+bookMeetingRoom.getStarttime() + " - " +bookMeetingRoom.getEndtime() +"\nหัวข้อเรื่อง " + bookMeetingRoom.getTopic()+
					"\nจำนวน " + bookMeetingRoom.getAttendees() + " คน\n" + "เบอร์โทร " + bookMeetingRoom.getTelbookingby());
			mail.setFrom("Book Meeting Room Notify! <myemail>");

		}else{
			mail.setText("คุณ " + user.getFirstname() + " " + user.getLastname() + "\nจองห้องประชุม " + bookMeetingRoom.getRoomname().getRoomnames()
					+ "\nเวลา "+bookMeetingRoom.getStarttime() + " - " +bookMeetingRoom.getEndtime() +"\nหัวข้อเรื่อง " + bookMeetingRoom.getTopic()+
					"\nจำนวน " + bookMeetingRoom.getAttendees() + " คน\n" +"หมายเหตุ "+ bookMeetingRoom.getRemark() + "\nเบอร์โทร " + bookMeetingRoom.getTelbookingby());
			mail.setFrom("Book Meeting Room Notify! <myemail>");

		}


		javaMailSender.send(mail);
	}



}
