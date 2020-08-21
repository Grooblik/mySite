<?php

$method = $_SERVER['REQUEST_METHOD'];

//Script Foreach
$c = true;
if ( $method === 'POST' ) {

	$name = trim($_POST["name"]);
	$email  = trim($_POST["email"]);
	$tel = trim($_POST["tel"]);
	$admin_email = 'bobylkovt@gmail.com';
	$form_subject = 'РОБОТА';

	foreach ( $_POST as $key => $value ) {
		if ( $value != "" && $key != "form_subject" && $key != "admin_email" ) {
			$message .= "
			" . ( ($c = !$c) ? '<tr>':'<tr>' ) . "
				<td style='padding: 10px; width: auto;'><b>$key:</b></td>
				<td style='padding: 10px;width: 100%;'>$value</td>
			</tr>
			";
		}
	}
} else if ( $method === 'GET' ) {

	$name = trim($_GET["name"]);
	$email  = trim($_GET["email"]);
	$tel = trim($_GET["tel"]);
	$admin_email = 'bobylkovt@gmail.com';
	$form_subject = 'РОБОТА';

	foreach ( $_GET as $key => $value ) {
		if ( $value != "" && $key != "admin_email" && $key != "form_subject" ) {
			$message .= "
			" . ( ($c = !$c) ? '<tr>':'<tr>' ) . "
				<td style='padding: 10px; width: auto;'><b>$key:</b></td>
				<td style='padding: 10px;width: 100%;'>$value</td>
			</tr>
			";
		}
	}
}

$message = "<table style='width: 50%;'>$message</table>";

function adopt($text) {
	return '=?UTF-8?B?'.Base64_encode($text).'?=';
}

$headers = "MIME-Version: 1.0" . PHP_EOL .
"Content-Type: text/html; charset=utf-8" . PHP_EOL .
'From: '.adopt($name).' <'.$email.'>' . PHP_EOL .
'Reply-To: '.$admin_email.'' . PHP_EOL;

mail($admin_email, adopt($form_subject), $message, $headers );
?>