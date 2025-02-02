--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

-- Started on 2025-01-30 10:56:08

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- TOC entry 215 (class 1259 OID 24766)
-- Name: invoices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.invoices (
    invoice_code character varying(50) NOT NULL,
    due_date date,
    name character varying(255),
    money_amount numeric(10,2),
    status character varying(50)
);


ALTER TABLE public.invoices OWNER TO postgres;

--
-- TOC entry 4832 (class 0 OID 24766)
-- Dependencies: 215
-- Data for Name: invoices; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.invoices VALUES ('JBOsJL', '2011-09-30', 'var1denis1', 100.20, 'pending');
INSERT INTO public.invoices VALUES ('JcPeaL', '2011-09-30', 'var1denis1', 100.20, 'pending');
INSERT INTO public.invoices VALUES ('kdkHsI', '2011-09-30', 'var1denis1', 100.20, 'pending');
INSERT INTO public.invoices VALUES ('rxiRFL', '2011-09-30', 'var1denis1', 100.20, 'pending');
INSERT INTO public.invoices VALUES ('L4HQzO', '2011-09-30', 'var1denis1', -100.00, 'pending');
INSERT INTO public.invoices VALUES ('aRLSH4', '2011-09-30', 'var1denis1', 100.00, 'pending');
INSERT INTO public.invoices VALUES ('VZksdv', '2011-09-30', 'var1denis1', 100.00, 'pending');
INSERT INTO public.invoices VALUES ('1Qf5Wu', '2011-09-30', 'var1denis1', 102.48, 'pending');
INSERT INTO public.invoices VALUES ('sSB7E3', '2011-09-30', 'var1denis1', 102.48, 'pending');
INSERT INTO public.invoices VALUES ('IMhIzg', '2011-09-30', 'var1denis1', 102.48, 'draft');
INSERT INTO public.invoices VALUES ('uhorLj', '2011-09-30', 'var1denis1', 102.48, 'draft');
INSERT INTO public.invoices VALUES ('FU7egf', '2022-11-11', 'pavardenis', 199.20, 'paid');


--
-- TOC entry 4688 (class 2606 OID 24770)
-- Name: invoices invoices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_pkey PRIMARY KEY (invoice_code);


-- Completed on 2025-01-30 10:56:08

--
-- PostgreSQL database dump complete
--

