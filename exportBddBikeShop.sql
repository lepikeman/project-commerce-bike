--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0 (Debian 17.0-1.pgdg120+1)
-- Dumped by pg_dump version 17.0 (Debian 17.0-1.pgdg120+1)

-- Started on 2024-11-06 15:54:05 CET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3380 (class 0 OID 16389)
-- Dependencies: 217
-- Data for Name: tb_orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_orders (id, order_date, user_id, product_id, delivered, "deleteAt") FROM stdin;
21	2024-10-01 00:00:00	1	1	\N	\N
22	2024-10-02 00:00:00	1	2	\N	\N
23	2024-10-03 00:00:00	1	3	\N	\N
24	2024-10-04 00:00:00	2	4	\N	\N
25	2024-10-05 00:00:00	2	5	\N	\N
26	2024-10-06 00:00:00	2	6	\N	\N
27	2024-10-07 00:00:00	3	7	\N	\N
28	2024-10-08 00:00:00	3	8	\N	\N
31	2024-10-11 00:00:00	3	11	\N	\N
32	2024-10-12 00:00:00	1	12	\N	\N
33	2024-10-13 00:00:00	2	13	\N	\N
34	2024-10-14 00:00:00	3	14	\N	\N
35	2024-10-15 00:00:00	1	15	\N	\N
36	2024-10-16 00:00:00	2	16	\N	\N
37	2024-10-17 00:00:00	3	17	\N	\N
38	2024-10-18 00:00:00	1	18	\N	\N
39	2024-10-19 00:00:00	2	19	\N	\N
40	2024-10-20 00:00:00	3	20	\N	\N
30	2024-10-10 00:00:00	2	10	f	2024-10-30 14:58:01.066316
29	2024-10-09 00:00:00	1	9	t	\N
\.


--
-- TOC entry 3382 (class 0 OID 16393)
-- Dependencies: 219
-- Data for Name: tb_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_products (id, product_name, factorynew, description, price) FROM stdin;
1	Product 1	t	Description for product 1	10.99
2	Product 2	t	Description for product 2	12.99
3	Product 3	f	Description for product 3	15.99
4	Product 4	t	Description for product 4	18.99
5	Product 5	f	Description for product 5	20.99
6	Product 6	f	Description for product 6	25.99
7	Product 7	f	Description for product 7	30.99
8	Product 8	t	Description for product 8	35.99
9	Product 9	t	Description for product 9	40.99
10	Product 10	f	Description for product 10	45.99
11	Product 11	t	Description for product 11	50.99
12	Product 12	t	Description for product 12	55.99
13	Product 13	f	Description for product 13	60.99
14	Product 14	f	Description for product 14	65.99
15	Product 15	f	Description for product 15	70.99
16	Product 16	t	Description for product 16	75.99
17	Product 17	t	Description for product 17	80.99
18	Product 18	t	Description for product 18	85.99
19	Product 19	f	Description for product 19	90.99
20	Product 20	f	Description for product 20	95.99
\.


--
-- TOC entry 3384 (class 0 OID 16399)
-- Dependencies: 221
-- Data for Name: tb_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tb_users (id, username, password, email_user, "hashedRefreshToken", "deletedAt") FROM stdin;
4	Le1oa	password456u9sas	1234@gmail.com	\N	\N
2	Axel	password456	newemail@example.com	\N	\N
9	adam	$2b$10$602.FFSGou1gygj3GWkIa.dfFoiRYwGW0ZpXqdV89kZToBnc5g9Km	adam@gmail.com	\N	\N
5	quentin	$2b$10$O2ltg6Kw1BNp8URe2odCLePzc4C9V5s/ux9edwfO8zkSSZQv1QYEe	quentin@gmail.com	$argon2id$v=19$m=65536,t=3,p=4$8/Wu/yY1AcmuWHUg/ReJDA$pfLcvei6p/+pSc+R5wARBpXsEl3zh2NtuDgZf7Xefxg	\N
3	boblegroslapin	$2b$10$zitGzmOL4lP9hBa2A97zbux0Gbpss7A6LYAcTj9pSxcSE4jwLkuKG	bob@gmail.com	$argon2id$v=19$m=65536,t=3,p=4$0rMs6PjL6pc/recsfDjErw$wd/bFxe8EcpBr0RmvcILPHHrZ8AvVPFEHFynPqEZVR8	\N
1	lea	password456	lea@gmail.com	\N	\N
\.


--
-- TOC entry 3395 (class 0 OID 0)
-- Dependencies: 218
-- Name: tb_orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_orders_id_seq', 40, true);


--
-- TOC entry 3396 (class 0 OID 0)
-- Dependencies: 220
-- Name: tb_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_products_id_seq', 20, true);


--
-- TOC entry 3397 (class 0 OID 0)
-- Dependencies: 222
-- Name: tb_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_users_id_seq', 9, true);


-- Completed on 2024-11-06 15:54:05 CET

--
-- PostgreSQL database dump complete
--

