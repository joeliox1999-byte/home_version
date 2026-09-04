-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 04. Sep 2026 um 19:42
-- Server-Version: 10.4.32-MariaDB
-- PHP-Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `webserver_status`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `status`
--

CREATE TABLE `status` (
  `wid` int(11) NOT NULL,
  `aktualisierung` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `ping` int(11) DEFAULT NULL,
  `fehler` text DEFAULT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `status`
--

INSERT INTO `status` (`wid`, `aktualisierung`, `ping`, `fehler`, `status`) VALUES
(1, '2026-09-04 16:15:39', 129, NULL, 'online'),
(2, '2026-09-04 16:15:44', NULL, 'network timeout at: https://acmtops.org/', 'offline'),
(3, '2026-09-04 16:15:44', NULL, 'request to https://anwendertag-forensik.de/ failed, reason: unable to verify the first certificate; if the root CA is installed locally, try running Node.js with --use-system-ca', 'offline'),
(4, '2026-09-04 16:15:49', NULL, 'network timeout at: https://anwendertag-forensik.org/', 'offline'),
(31, '2026-09-04 16:15:52', 3214, NULL, 'online'),
(32, '2026-09-04 16:15:53', 279, NULL, 'online'),
(34, '2026-09-04 16:15:53', 193, NULL, 'online'),
(35, '2026-09-04 16:15:53', 239, NULL, 'online');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `website`
--

CREATE TABLE `website` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `url` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `website`
--

INSERT INTO `website` (`id`, `name`, `url`) VALUES
(1, 'Fraunhofer institut', 'https://www.sit.fraunhofer.de'),
(2, 'acmtops', 'https://acmtops.org'),
(3, 'anwendertag-forensik.de', 'https://anwendertag-forensik.de'),
(4, 'anwendertag-forensik.org', 'https://anwendertag-forensik.org'),
(31, 'https://mns-riedstadt.de', 'https://mns-riedstadt.de'),
(32, 'https://behaimschule.org/', 'https://behaimschule.org'),
(34, 'https://shop.srino.net/', 'https://shop.srino.net'),
(35, 'issys-goldene-pfote.de', 'https://issys-goldene-pfote.de');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`wid`,`aktualisierung`);

--
-- Indizes für die Tabelle `website`
--
ALTER TABLE `website`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `website`
--
ALTER TABLE `website`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `status`
--
ALTER TABLE `status`
  ADD CONSTRAINT `wid` FOREIGN KEY (`wid`) REFERENCES `website` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
