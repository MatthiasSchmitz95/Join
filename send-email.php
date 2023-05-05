<?php

if (isset($_POST['email'])) {
  $to = $_POST['email'];
  $subject = 'Test email';
  $message = 'This is a test email';
  $headers = 'From: your-email@example.com' . "\r\n" .
             'Reply-To: your-email@example.com' . "\r\n" .
             'X-Mailer: PHP/' . phpversion();

  if (filter_var($to, FILTER_VALIDATE_EMAIL)) {
    if (mail($to, $subject, $message, $headers)) {
      echo 'Email sent to ' . $to;
    } else {
      echo 'Failed to send email';
    }
  } else {
    echo 'Invalid email address';
  }
}

?>