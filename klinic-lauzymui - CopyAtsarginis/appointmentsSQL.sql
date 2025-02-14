--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-02-09 20:22:00

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
    rating integer
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


--
-- TOC entry 4855 (class 0 OID 32807)
-- Dependencies: 220
-- Data for Name: visits; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.visits VALUES (20, 4, '12', 'Andrejus', '2020-01-10', '20:14:00', 'brisius sveikas', NULL);
INSERT INTO public.visits VALUES (21, 4, '12', 'Andrejus', '2024-11-11', '20:14:00', 'brisius sveikas', NULL);
INSERT INTO public.visits VALUES (22, 4, '12', 'Ss', '2024-11-11', '20:14:00', 'brisius sveikas', NULL);
INSERT INTO public.visits VALUES (23, 4, '12', 'Ss', '2024-11-11', '20:14:00', 'qq', NULL);
INSERT INTO public.visits VALUES (24, 4, '12', 'Ss', '2020-11-11', '20:14:00', 'qq', NULL);
INSERT INTO public.visits VALUES (25, 4, '12', 'Ss', '2020-01-11', '20:14:00', 'qq', NULL);
INSERT INTO public.visits VALUES (26, 3, '12', 'Ss', '2020-01-11', '20:14:00', 'qq', NULL);
INSERT INTO public.visits VALUES (8, 4, 'adminas pakeite', 'Balvonas', '2024-02-05', '20:14:00', 'piktas dar ir kaip', 1);
INSERT INTO public.visits VALUES (27, 4, 'Aaaa', 'Daa', '2025-02-09', '14:44:00', 'bla bla', NULL);
INSERT INTO public.visits VALUES (28, 4, 'Aaaa', 'Daa', '2025-02-09', '14:44:00', 'bla bla', NULL);
INSERT INTO public.visits VALUES (29, 4, 'Brisius', 'Tarvydas Yamamoto', '2025-02-09', '14:58:00', 'Brisius skundziasi  galvos ksuasmais', NULL);
INSERT INTO public.visits VALUES (30, 4, 'Buldogas', 'Vaidotas Zala', '2025-02-27', '00:00:00', 'Negaluoja', NULL);
INSERT INTO public.visits VALUES (31, 4, 'Buldogas', 'Vaidotas Zala', '2025-02-27', '00:00:00', 'Negaluoja', NULL);
INSERT INTO public.visits VALUES (32, 4, 'Buldogas', 'Vaidotas Zala', '2025-02-27', '17:57:00', 'kazkas atsitiko', NULL);
INSERT INTO public.visits VALUES (33, 3, 'Asss', 'Daa', '2025-02-09', '00:00:00', 'bandymas', NULL);
INSERT INTO public.visits VALUES (34, 3, 'Admino Sou', 'Admino', '2025-02-19', '11:11:00', 'Adminas parase 11.11', NULL);
INSERT INTO public.visits VALUES (36, 3, 'Liutas', 'Rimtas Dede', '2025-02-19', '21:00:00', 'Uzsireginau seip sau testas', NULL);


--
-- TOC entry 4863 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- TOC entry 4864 (class 0 OID 0)
-- Dependencies: 219
-- Name: visits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.visits_id_seq', 38, true);


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


-- Completed on 2025-02-09 20:22:00

--
-- PostgreSQL database dump complete
--

