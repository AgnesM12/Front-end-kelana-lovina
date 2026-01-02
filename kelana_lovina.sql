-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 02 Jan 2026 pada 03.56
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kelana_lovina`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `itinerary`
--

CREATE TABLE `itinerary` (
  `id` int(11) NOT NULL,
  `paket_id` int(11) NOT NULL,
  `hari_ke` int(11) NOT NULL,
  `jam_mulai` time DEFAULT NULL,
  `jam_selesai` time DEFAULT NULL,
  `aktivitas` varchar(255) NOT NULL,
  `lokasi` varchar(150) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `paket`
--

CREATE TABLE `paket` (
  `id` int(50) NOT NULL,
  `title` varchar(225) NOT NULL,
  `slug` varchar(225) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `duration` varchar(50) NOT NULL,
  `capacity` varchar(50) NOT NULL,
  `location` varchar(255) NOT NULL,
  `departurTime` varchar(50) NOT NULL,
  `tagLine` varchar(255) NOT NULL,
  `desk` text NOT NULL,
  `rating_avg` decimal(3,2) DEFAULT NULL,
  `total_reviews` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `paket`
--

INSERT INTO `paket` (`id`, `title`, `slug`, `price`, `duration`, `capacity`, `location`, `departurTime`, `tagLine`, `desk`, `rating_avg`, `total_reviews`, `created_at`) VALUES
(1, 'Rafatour dolphin & snorkeling', 'rafatour-dolphin-&-snorkeling', 300000, '3-4 Jam', 'Maksimal 10 orang/perahu', 'Pantai Lovina, Bali', '05.30 WITA', 'Durasi 1 jam – Termasuk minuman ringan', 'Pengalaman melihat lumba-lumba;Pengalaman berenang dengan lumba-lumba;Snorkeling;Pelampung keselamatan;Pemandu lokal berpengalaman', NULL, NULL, '2025-12-27 21:08:47'),
(2, 'Seadolphine Lovina', 'seadolphine-lovina', 350000, '2-3 Jam', 'Maksimal 5 orang/perahu', 'Pantai Lovina, Bali', '05.30 WITA', 'Durasi 2 jam - Termasuk snack & minum', 'Pengalaman melihat lumba-lumba;Berenang bersama lumba-lumba;Snorkeling di Lovina;Perlengkapan snorkeling;Pelampung;Captain dan pemandu', NULL, NULL, '2025-12-27 21:08:47'),
(3, 'Watching Dolphin Only', 'watching-dolphin-only', 100000, '2 Jam', 'Maksimal 8-10 orang/perahu', 'Pantai Lovina, Bali', '16.30 WITA', 'Durasi 2 jam - Termasuk pelampung & gupaketIde', 'Perahu sharing;Pelampung keselamatan;Pemandu', NULL, NULL, '2025-12-27 21:08:47'),
(4, 'Snorkeling & Dolphin Tur', 'snorkeling-&-dolphin-tur', 350000, '2 Jam', 'Maksimal 5 orang/perahu', 'Pantai Lovina, Bali', '05.30 WITA', 'Durasi 3 jam - Termasuk minuman hangat', 'Satu botol mineral untuk setiap peserta;Menikmati minuman selamat datang khas Bali (Teh atau kopi) setibanya di Pantai Lovina;Peralatan snorkeling;Pemandu lokal berpengalaman;Dokumentasi kegiatan (Foto dan Video)', NULL, NULL, '2025-12-27 21:08:47'),
(5, 'Dolphin Watching Tur', 'dolphin-watching-tur', 200000, '3 Jam', 'Maksimal 5 orang/perahu', 'Pantai Lovina, Bali', '16.30 WITA', 'Durasi 1,5 jam - Termasuk pelampung', 'Pengalaman berenang dengan lumba-lumba saat matahari terbit;Minuman hangat diatas perahu;Pelampung keselamatan;Pemandu lokal berpengalaman', NULL, NULL, '2025-12-27 21:08:47'),
(6, 'Swim with Dolphin', 'swim-with-dolphin', 200000, '1,5 Jam', 'Maksimal 5 orang/perahu', 'Pantai Lovina, Bali', '05.30 WITA', 'Durasi 2 jam - Termasuk satu perahu khusus', 'Pengalaman berenang dengan lumba-lumba saat matahari terbit;Air mineral;Pelampung keselamatan;Pamandu lokal berpengalaman', NULL, NULL, '2025-12-27 21:08:47'),
(7, 'Private Tour Guide', 'private-tour-guide', 400000, '2 Jam', 'Maksimal 5 orang/perahu', 'Pantai Lovina, Bali', '05.30 WITA', 'Durasi 2 jam - Termasuk satu perahu khusus', '1 Perahu khusus pribadi hanya untuk Anda dan rombongan;Pengalaman ekslusif menyaksikan lumba-lumba;Pelampung keselamatan;Private guide lokal berpengalaman yang mendampongi penuh selama tur;Air mineral & snack ringan diatas perahu', NULL, NULL, '2025-12-27 21:08:47'),
(8, 'Snorkeling Lovina', 'snorkeling-lovina', 150000, '2 Jam', 'Maksimal 5 orang/perahu', 'Pantai Lovina, Bali', '05.30 WITA', 'Durasi 2 jam', 'Peralatan snorkeling lengkap (masker, snorkel, fin);Pelampung keselamatan;Pemandu lokal berpengalaman;Pengalaman snorkeling di spot terbaik lovina', NULL, NULL, '2025-12-27 21:08:47'),
(9, 'Bali Surga Private Tour Lovina With Dolphin Tour', 'bali-surga-private-tour-lovina-with-dolphin-tour', 600000, '2 Jam', 'Maksimal 5 orang/perahu', 'Pantai Lovina, Bali', '05.30 WITA', '', 'Private boat;Air mineral untuk setiap peserta;Pelampung keselamatan;Pemandu lokal berpengalaman;Pengalaman snorkeling di spot terbaik Lovina', NULL, NULL, '2025-12-27 21:08:47'),
(10, 'Sharing Tour Lovina Ocean Tour Sunrise Dolphin Tour', 'sharing-tour-lovina-ocean-tour-sunrise-dolphin-tour', 100000, '2 Jam', 'Maksimal 5 orang/perahu', 'Pantai Lovina, Bali', '05.30 WITA', '', 'Perjalanan sunrise melihat lumba-lumba di Laut Lovina;Perahu sharing bersama peserta lain;Pemandu lokal berpengalaman;Pelampung keselamatan tersedia untuk setiap peserta;Pengalaman menikmati keindahan matahari terbit di Lovina', NULL, NULL, '2025-12-27 21:08:47'),
(11, 'Private Tour Lovina Ocean Tour Sunrise Dolphin Tour', 'private-tour-lovina-ocean-tour-sunrise-dolphin-tour', 150000, '2 Jam', 'Maksimal 5 orang/perahu', 'Pantai Lovina, Bali', '05.30 WITA', '', 'Perjalanan sunrise melihat lumba-lumba di Laut Lovina;Perahu khusus private boat;Pemandu lokal berpengalaman;Pelampung keselamatan tersedia untuk setiap peserta;Pengalaman menikmati keindahan matahari terbit di Lovina', NULL, NULL, '2025-12-27 21:08:47'),
(13, 'Private Tour Paket Dolphin Watching Swim & Snorkling', 'private-tour-paket-dolphin-watching-swim-&-snorkling', 350000, '3 Jam', 'Maksimal 5 orang/perahu', 'Pantai Lovina, Bali', '08.30 WITA', '', 'Berenang bersama lumba-lumba di area yang diizinkan;Peralatan snorkeling lengkap (masker, snorkel, fin);Pelampung keselamatan untuk setiap peserta;Perahu khusus private boat;Pemandu lokal berpengalaman untuk memastikan keamanan dan kenyamanan', NULL, NULL, '2025-12-27 21:08:47'),
(14, 'Paon Happy Sharing Boat Watching Dolphin Only', 'paon-happy-sharing-boat-watching-dolphin-only', 200000, '3 Jam', 'Maksimal 5 orang/perahu', 'Pantai Lovina, Bali', '08.30 WITA', '', 'Perjalanan sunrise melihat lumba-lumba di Laut Lovina;Pelampung keselamatan untuk setiap peserta;Perahu khusus private boat;Pemandu lokal berpengalaman untuk memastikan keamanan dan kenyamanan', NULL, NULL, '2025-12-27 21:08:47'),
(15, 'Paon Happy Sharing Boat Watching Dolphin (Breakfast)', 'paon-happy-sharing-boat-watching-dolphin-(breakfast)', 130000, '1,5 Jam', 'Maksimal 5 orang/perahu', 'Pantai Lovina, Bali', '08.30 WITA', '', 'Sarapan pagi sebelum keberangkatan;Perjalanan melihat lumba-lumba menggunakan perahu sharing;Mengamati lumba-lumba di habitat aslinya tanpa berenang bersama;Pelampung keselamatan tersedia untuk setiap peserta;Pemandu lokal berpengalaman untuk memastikan keamanan dan kenyamanan;Tur santai dengan perahu sharing bersama peserta lain', NULL, NULL, '2025-12-27 21:08:47'),
(16, 'Paon Happy Sharing Boat Watching Dolphin (Swimming)', 'paon-happy-sharing-boat-watching-dolphin-(swimming)', 350000, '2 Jam', 'Maksimal 5 orang/perahu', 'Pantai Lovina, Bali', '08.30 WITA', '', 'Berenang bersama lumba-lumba pada area yang diizinkan;Perjalanan melihat lumba-lumba menggunakan perahu sharing;Pelampung keselamatan tersedia untuk setiap peserta;Pemandu lokal berpengalaman untuk memastikan keamanan dan kenyamanan;Tur santai dengan perahu sharing bersama peserta lain', NULL, NULL, '2025-12-27 21:08:47'),
(17, 'Paon Happy Private Boat Watching Dolphin (Snorkling)', 'paon-happy-private-boat-watching-dolphin-(snorkling)', 200000, '2,5 Jam', 'Maksimal 5 orang/perahu', 'Pantai Lovina, Bali', '08.30 WITA', '', 'Snorkling pada area yang diizinkan;Perjalanan melihat lumba-lumba menggunakan perahu sharing;Mengamati lumba-lumba di habitat aslinya tanpa berenang bersama;Pelampung keselamatan tersedia untuk setiap peserta;Pemandu lokal berpengalaman untuk memastikan keamanan dan kenyamanan;Tur santai dengan perahu sharing bersama peserta lain', NULL, NULL, '2025-12-27 21:08:47'),
(18, 'Paon Happy Private Boat Watching Dolphin', 'paon-happy-private-boat-watching-dolphin', 450000, '3 Jam', 'Minimal 2 orang/perahu', 'Pantai Lovina, Bali', '08.30 WITA', '', 'Perjalanan melihat lumba-lumba;Snorkling dan berenang bersama lumba-lumba pada area yang diizinkan;Sarapan pagi sebelum keberangkatan;Pelampung keselamatan tersedia untuk setiap peserta;Pemandu lokal berpengalaman untuk memastikan keamanan dan kenyamanan;Tur santai dengan perahu sharing bersama peserta lain', NULL, NULL, '2025-12-27 21:08:47'),
(19, 'Paon Happy Private Boat Watching', 'paon-happy-private-boat-watching', 400000, '2,5 Jam', 'Hanya 2 orang/perahu', 'Pantai Lovina, Bali', '08.30 WITA', '', 'Additional 1 orang 100/orang;Perjalanan melihat lumba-lumba;Mengamati lumba-lumba di habitat aslinya tanpa berenang bersama;Pelampung keselamatan tersedia untuk setiap peserta;Pemandu lokal berpengalaman untuk memastikan keamanan dan kenyamanan;Tur santai dengan perahu sharing bersama peserta lain', NULL, NULL, '2025-12-27 21:08:47'),
(20, 'Saraswati Tour Sunrise Dolphine', 'saraswati-tour-sunrise-dolphine', 100000, '2-3 Jam', 'Maksimal 5 orang/perahu', 'Pantai Lovina, Bali', '08.30 WITA', '', 'Perjalanan melihat lumba-lumba;Mengamati lumba-lumba di habitat aslinya tanpa berenang bersama;Pelampung keselamatan tersedia untuk setiap peserta;Pemandu lokal berpengalaman untuk memastikan keamanan dan kenyamanan;Tur santai dengan perahu sharing bersama peserta lain', NULL, NULL, '2025-12-27 21:08:47'),
(21, 'Saraswati Tour Lovina Snorkling', 'saraswati-tour-lovina-snorkling', 100000, '2-3 Jam', 'Maksimal 5 orang/perahu', 'Pantai Lovina, Bali', '08.30 WITA', '', 'Perjalanan melihat lumba-lumba;Mengamati lumba-lumba di habitat aslinya tanpa berenang bersama;Pelampung keselamatan tersedia untuk setiap peserta;Pemandu lokal berpengalaman untuk memastikan keamanan dan kenyamanan;Tur santai dengan perahu sharing bersama peserta lain', NULL, NULL, '2025-12-27 21:08:47');

-- --------------------------------------------------------

--
-- Struktur dari tabel `payments`
--

CREATE TABLE `payments` (
  `order_id` varchar(50) NOT NULL,
  `id` int(11) NOT NULL,
  `fullName` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `jumlahOrang` int(11) NOT NULL,
  `nomorTelpon` varchar(30) NOT NULL,
  `tanggalBerangkat` date NOT NULL,
  `paketId` int(11) NOT NULL,
  `paketNama` varchar(200) NOT NULL,
  `totalPayment` bigint(20) NOT NULL,
  `midtrans_transaction_id` varchar(100) DEFAULT NULL,
  `payment_type` varchar(50) DEFAULT NULL,
  `payment_code` varchar(100) DEFAULT NULL,
  `pdf_url` varchar(255) DEFAULT NULL,
  `expiry_time` datetime DEFAULT NULL,
  `fraud_status` varchar(20) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `payments`
--

INSERT INTO `payments` (`order_id`, `id`, `fullName`, `email`, `jumlahOrang`, `nomorTelpon`, `tanggalBerangkat`, `paketId`, `paketNama`, `totalPayment`, `midtrans_transaction_id`, `payment_type`, `payment_code`, `pdf_url`, `expiry_time`, `fraud_status`, `status`, `created_at`, `updated_at`) VALUES
('', 306, 'Ifani Claudya Patanduk', 'ifanipatanduk@gmail.com', 1, '085241422489', '2026-01-02', 5, 'Dolphin Watching Tur', 210000, NULL, NULL, NULL, NULL, NULL, NULL, 'success', '2026-01-02 02:29:36', '2026-01-02 02:29:36');

-- --------------------------------------------------------

--
-- Struktur dari tabel `rencana_paket`
--

CREATE TABLE `rencana_paket` (
  `id` int(11) NOT NULL,
  `rencana_id` int(11) NOT NULL,
  `paket_id` int(11) NOT NULL,
  `harga` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `rencana_perjalanan`
--

CREATE TABLE `rencana_perjalanan` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `tanggal` date NOT NULL,
  `total_estimasi_harga` int(11) DEFAULT NULL,
  `status` enum('DRAFT','CHECKOUT','SELESAI') DEFAULT 'DRAFT',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `review`
--

CREATE TABLE `review` (
  `id` int(11) NOT NULL,
  `user_data` int(11) NOT NULL,
  `paket_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `text` varchar(350) NOT NULL,
  `images` text NOT NULL,
  `tanggal` varchar(30) NOT NULL,
  `likes` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `tiket_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tiket`
--

CREATE TABLE `tiket` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `payment_id` int(11) NOT NULL,
  `barcode_tiket` varchar(255) NOT NULL,
  `paket_id` int(11) NOT NULL,
  `booking_id` varchar(100) NOT NULL DEFAULT '',
  `tanggalBerangkat` date NOT NULL,
  `jumlahOrang` int(11) NOT NULL DEFAULT 1,
  `status` enum('UNUSED','USED','EXPIRED') DEFAULT 'UNUSED',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fotoProfile` varchar(100) NOT NULL,
  `bio` varchar(255) NOT NULL,
  `preferensiWisata` varchar(250) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `fotoProfile`, `bio`, `preferensiWisata`, `created_at`) VALUES
(7, 'ifanipatanduk@gmail.com', 'Panii', '$2a$10$LPq4RM0GrxA4lVV4zqSEYe9BDucE4X6P5hn1qVBTPPDkwwwFccLBm', '/profileDefault.jpg', 'Traveling pani', '[\"Pantai\",\"Snorkeling\"]', '2025-12-15 07:40:03'),
(11, 'panipatanduk@gmail.com', 'panipatanduk', '$2a$10$eSww33JdoXRobiF/jRc/0.A.HDSIhes3N.fSTM4c1mP0E9cCOPw1i', '/profileDefault.jpg', '', '[]', '2025-12-29 12:56:29');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `itinerary`
--
ALTER TABLE `itinerary`
  ADD PRIMARY KEY (`id`),
  ADD KEY `paket_id` (`paket_id`);

--
-- Indeks untuk tabel `paket`
--
ALTER TABLE `paket`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_id` (`order_id`);

--
-- Indeks untuk tabel `rencana_paket`
--
ALTER TABLE `rencana_paket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rencana_id` (`rencana_id`),
  ADD KEY `paket_id` (`paket_id`);

--
-- Indeks untuk tabel `rencana_perjalanan`
--
ALTER TABLE `rencana_perjalanan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user` (`user_data`),
  ADD KEY `fk_paket` (`paket_id`);

--
-- Indeks untuk tabel `tiket`
--
ALTER TABLE `tiket`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `barcode_tiket` (`barcode_tiket`),
  ADD KEY `payment_id` (`payment_id`),
  ADD KEY `fk_tiket_user` (`user_id`),
  ADD KEY `fk_tiket_paket` (`paket_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `itinerary`
--
ALTER TABLE `itinerary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=310;

--
-- AUTO_INCREMENT untuk tabel `rencana_paket`
--
ALTER TABLE `rencana_paket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `rencana_perjalanan`
--
ALTER TABLE `rencana_perjalanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT untuk tabel `tiket`
--
ALTER TABLE `tiket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `itinerary`
--
ALTER TABLE `itinerary`
  ADD CONSTRAINT `itinerary_ibfk_1` FOREIGN KEY (`paket_id`) REFERENCES `paket` (`id`);

--
-- Ketidakleluasaan untuk tabel `rencana_paket`
--
ALTER TABLE `rencana_paket`
  ADD CONSTRAINT `rencana_paket_ibfk_1` FOREIGN KEY (`rencana_id`) REFERENCES `rencana_perjalanan` (`id`),
  ADD CONSTRAINT `rencana_paket_ibfk_2` FOREIGN KEY (`paket_id`) REFERENCES `paket` (`id`);

--
-- Ketidakleluasaan untuk tabel `rencana_perjalanan`
--
ALTER TABLE `rencana_perjalanan`
  ADD CONSTRAINT `rencana_perjalanan_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ketidakleluasaan untuk tabel `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `fk_paket` FOREIGN KEY (`paket_id`) REFERENCES `paket` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_data`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `tiket`
--
ALTER TABLE `tiket`
  ADD CONSTRAINT `fk_tiket_paket` FOREIGN KEY (`paket_id`) REFERENCES `paket` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_tiket_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tiket_ibfk_1` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
