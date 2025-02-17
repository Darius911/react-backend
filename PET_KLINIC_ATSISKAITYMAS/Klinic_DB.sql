--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-02-16 19:54:30

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 32800)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    role character varying(100),
    password character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 32799)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4861 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 220 (class 1259 OID 32807)
-- Name: visits; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.visits (
    id integer NOT NULL,
    user_id integer,
    pets_name character varying(255) NOT NULL,
    owner_name character varying(255) NOT NULL,
    date date NOT NULL,
    "time" time without time zone NOT NULL,
    notes character varying(255),
    rating integer,
    status character varying(20)
);


ALTER TABLE public.visits OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 32806)
-- Name: visits_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.visits_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.visits_id_seq OWNER TO postgres;

--
-- TOC entry 4862 (class 0 OID 0)
-- Dependencies: 219
-- Name: visits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.visits_id_seq OWNED BY public.visits.id;


--
-- TOC entry 4700 (class 2604 OID 32803)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4701 (class 2604 OID 32810)
-- Name: visits id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visits ALTER COLUMN id SET DEFAULT nextval('public.visits_id_seq'::regclass);


--
-- TOC entry 4853 (class 0 OID 32800)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (1, 'Vladas Vladislavas', 'testas@example.com', 'user', '$argon2id$v=19$m=65536,t=3,p=4$bqZ+71wOb70sRjegPY4H+A$ZNa5Zw32O5W6EfuMsymoRcRYkQBNUhxJ77qEoKdzOpo');
INSERT INTO public.users VALUES (2, 'Admin', 'admin@gmail.com', 'admin', 'pass');
INSERT INTO public.users VALUES (3, 'Vardenis Pavardenis', 'adminas@gmail.com', 'admin', '$argon2id$v=19$m=65536,t=3,p=4$EHhUAS/878g0SOLw0JaG1g$FnK9fsmDC57hiH0EfB2laWgakL1H542/H3LFDeDDmAo');
INSERT INTO public.users VALUES (4, 'Begedis', 'begedis@gmail.com', 'user', '$argon2id$v=19$m=65536,t=3,p=4$30aFfp7glGiMjRoqha3H0w$nj8zsVU74Dv05cqMSKy9rjkAj//r/+vQDe2uxCuTcYQ');
INSERT INTO public.users VALUES (5, 'Testas', 'testas@gmail.com', 'user', '$argon2id$v=19$m=65536,t=3,p=4$v1cYzGRzOLwZacQFXfOOFQ$rMyT/RQ6r6NJaivzs61BId4yb98FNIXA9kN2a8O/OSU');
INSERT INTO public.users VALUES (6, 'Testas1', 'testas1@gmail.com', 'user', '$argon2id$v=19$m=65536,t=3,p=4$4t8WVXdrDmSIvQcvQSsw1w$bUeDtJfMVKSx75n1dVqPz9dYBlcT4v3jg4jQDuNo15E');
INSERT INTO public.users VALUES (7, 'Ramute', 'ramute@gmail.com', 'user', '$argon2id$v=19$m=65536,t=3,p=4$pfOegXFqpE2ZSa/SJdBKbQ$/j/5vTdjAQV07YcdCW2sre0//KBy2GwigqOEBBr6ouY');


--
-- TOC entry 4855 (class 0 OID 32807)
-- Dependencies: 220
-- Data for Name: visits; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.visits VALUES (29, 4, 'Brisius', 'Tarvydas Yamamoto', '2025-02-14', '11:11:00', 'bandau', 4, 'completed');
INSERT INTO public.visits VALUES (28, 4, 'Sunekas', 'Bevardenis', '2025-02-14', '22:11:00', 'testas', 1, 'pending');
INSERT INTO public.visits VALUES (36, 3, 'Liutas', 'Rimtas Dede', '2025-02-14', '11:11:00', 'Kazkas nutiko', 5, 'approved');
INSERT INTO public.visits VALUES (21, 4, 'Raketa', 'Andrejus', '2025-02-14', '17:52:00', 'Negaluoja', 5, 'pending');
INSERT INTO public.visits VALUES (39, 3, 'Statusas', 'Statusas1', '2025-02-14', '22:31:00', 'Vel ', 3, 'approved');
INSERT INTO public.visits VALUES (40, 6, 'Pifas', 'Statusas', '2025-02-14', '22:39:00', 'vel', NULL, 'pending');
INSERT INTO public.visits VALUES (34, 3, 'Pifas', 'Romas', '2025-02-14', '20:59:00', 'testas', 4, 'pending');
INSERT INTO public.visits VALUES (31, 4, 'Buldogas', 'Vaidotas Zala', '2025-02-14', '16:45:00', 'Buldogas mazai laka vandens', 2, 'pending');
INSERT INTO public.visits VALUES (22, 4, 'Tuk Tuk', 'Testas', '2025-02-14', '22:57:00', 'Testuoju toliau', 1, 'completed');
INSERT INTO public.visits VALUES (33, 3, 'Boooo', 'Vakaras', '2025-02-14', '16:09:00', 'Knarkia', 4, 'completed');
INSERT INTO public.visits VALUES (27, 4, 'Predator', 'Chukas Noris', '2025-02-14', '05:13:00', 'Nusilauze danti', 5, 'completed');
INSERT INTO public.visits VALUES (41, 7, 'Kacius', 'Ramute', '2025-02-14', '20:26:00', 'Pasveiko', NULL, 'completed');
INSERT INTO public.visits VALUES (42, 3, 'Ne', 'Taip', '2025-02-19', '03:58:00', 'vel', NULL, 'pending');
INSERT INTO public.visits VALUES (20, 4, 'Buldogas', 'Admino', '2025-02-11', '20:20:00', 'Negaluoja', 2, NULL);
INSERT INTO public.visits VALUES (32, 4, 'Buldogas', 'Vaidotas Zala', '2025-02-27', '17:57:00', 'kazkas atsitiko', 1, NULL);
INSERT INTO public.visits VALUES (25, 4, 'Toras', 'Valdelis Guzinskas', '2025-02-14', '19:24:00', 'Sausa nosis', 1, NULL);


--
-- TOC entry 4863 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- TOC entry 4864 (class 0 OID 0)
-- Dependencies: 219
-- Name: visits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.visits_id_seq', 42, true);


--
-- TOC entry 4703 (class 2606 OID 32805)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4705 (class 2606 OID 32814)
-- Name: visits visits_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT visits_pkey PRIMARY KEY (id);


--
-- TOC entry 4706 (class 2606 OID 32815)
-- Name: visits visits_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT visits_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2025-02-16 19:54:30

--
-- PostgreSQL database dump complete
--

