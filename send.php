<?php
$reponse = $_POST['reponse'] ?? 'Aucune réponse';

// Destination
$to = "vangmichael79@gmail.com";

// Sujet
$subject = "Nouvelle réponse de ta page 💖";

// Message
$message = "Réponse : " . $reponse . "\nEnvoyée le : " . date("d/m/Y H:i");

// Envoi
mail($to, $subject, $message);

// Ne rien afficher
exit;
?>
