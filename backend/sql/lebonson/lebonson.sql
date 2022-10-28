PGDMP         
            	    z           lebonson    14.4    14.4                 0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16448    lebonson    DATABASE     l   CREATE DATABASE lebonson WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE lebonson;
                postgres    false            �            1259    16487    orderdetail_lbs    TABLE     �   CREATE TABLE public.orderdetail_lbs (
    id integer NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    total double precision NOT NULL
);
 #   DROP TABLE public.orderdetail_lbs;
       public         heap    postgres    false            �            1259    16486    orderdetail_lbs_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orderdetail_lbs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.orderdetail_lbs_id_seq;
       public          postgres    false    216                       0    0    orderdetail_lbs_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.orderdetail_lbs_id_seq OWNED BY public.orderdetail_lbs.id;
          public          postgres    false    215            �            1259    16480 
   orders_lbs    TABLE     �   CREATE TABLE public.orders_lbs (
    id integer NOT NULL,
    user_id integer NOT NULL,
    totalamount double precision NOT NULL,
    creationtimestamp timestamp without time zone NOT NULL,
    status character varying(45) NOT NULL
);
    DROP TABLE public.orders_lbs;
       public         heap    postgres    false            �            1259    16479    orders_lbs_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_lbs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.orders_lbs_id_seq;
       public          postgres    false    214                       0    0    orders_lbs_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.orders_lbs_id_seq OWNED BY public.orders_lbs.id;
          public          postgres    false    213            �            1259    16471    product_lbs    TABLE     0  CREATE TABLE public.product_lbs (
    id integer NOT NULL,
    title character varying(90) NOT NULL,
    price double precision NOT NULL,
    image character varying(90) NOT NULL,
    quantity integer NOT NULL,
    creationtimestamp timestamp without time zone NOT NULL,
    description text NOT NULL
);
    DROP TABLE public.product_lbs;
       public         heap    postgres    false            �            1259    16470    product_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.product_id_seq;
       public          postgres    false    212                       0    0    product_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.product_id_seq OWNED BY public.product_lbs.id;
          public          postgres    false    211            �            1259    16462    user_lbs    TABLE     �  CREATE TABLE public.user_lbs (
    id integer NOT NULL,
    firstname character varying(255) NOT NULL,
    lastname character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    zip integer NOT NULL,
    city character varying(255) NOT NULL,
    creationtimestamp timestamp without time zone,
    role character varying(255) NOT NULL
);
    DROP TABLE public.user_lbs;
       public         heap    postgres    false            �            1259    16461    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public          postgres    false    210                       0    0    user_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.user_id_seq OWNED BY public.user_lbs.id;
          public          postgres    false    209            n           2604    16490    orderdetail_lbs id    DEFAULT     x   ALTER TABLE ONLY public.orderdetail_lbs ALTER COLUMN id SET DEFAULT nextval('public.orderdetail_lbs_id_seq'::regclass);
 A   ALTER TABLE public.orderdetail_lbs ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            m           2604    16483    orders_lbs id    DEFAULT     n   ALTER TABLE ONLY public.orders_lbs ALTER COLUMN id SET DEFAULT nextval('public.orders_lbs_id_seq'::regclass);
 <   ALTER TABLE public.orders_lbs ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    214    214            l           2604    16474    product_lbs id    DEFAULT     l   ALTER TABLE ONLY public.product_lbs ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);
 =   ALTER TABLE public.product_lbs ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    212    212            k           2604    16465    user_lbs id    DEFAULT     f   ALTER TABLE ONLY public.user_lbs ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 :   ALTER TABLE public.user_lbs ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210            	          0    16487    orderdetail_lbs 
   TABLE DATA           T   COPY public.orderdetail_lbs (id, order_id, product_id, quantity, total) FROM stdin;
    public          postgres    false    216   +$                 0    16480 
   orders_lbs 
   TABLE DATA           Y   COPY public.orders_lbs (id, user_id, totalamount, creationtimestamp, status) FROM stdin;
    public          postgres    false    214   H$                 0    16471    product_lbs 
   TABLE DATA           h   COPY public.product_lbs (id, title, price, image, quantity, creationtimestamp, description) FROM stdin;
    public          postgres    false    212   e$                 0    16462    user_lbs 
   TABLE DATA           y   COPY public.user_lbs (id, firstname, lastname, email, password, address, zip, city, creationtimestamp, role) FROM stdin;
    public          postgres    false    210   �0                  0    0    orderdetail_lbs_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.orderdetail_lbs_id_seq', 2, true);
          public          postgres    false    215                       0    0    orders_lbs_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.orders_lbs_id_seq', 2, true);
          public          postgres    false    213                       0    0    product_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.product_id_seq', 15, true);
          public          postgres    false    211                       0    0    user_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.user_id_seq', 15, true);
          public          postgres    false    209            v           2606    16492 $   orderdetail_lbs orderdetail_lbs_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.orderdetail_lbs
    ADD CONSTRAINT orderdetail_lbs_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.orderdetail_lbs DROP CONSTRAINT orderdetail_lbs_pkey;
       public            postgres    false    216            t           2606    16485    orders_lbs orders_lbs_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.orders_lbs
    ADD CONSTRAINT orders_lbs_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.orders_lbs DROP CONSTRAINT orders_lbs_pkey;
       public            postgres    false    214            r           2606    16478    product_lbs product_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.product_lbs
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.product_lbs DROP CONSTRAINT product_pkey;
       public            postgres    false    212            p           2606    16469    user_lbs user_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.user_lbs
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.user_lbs DROP CONSTRAINT user_pkey;
       public            postgres    false    210            	      x������ � �            x������ � �         E  x��X�v��]S_QG��:!i<�v�ÖliFG�ȳЦ	4ɶ4���?�_�d+�d��n�c�����g��t�я�{o݂�>�|I������q�����u��Oٲ�;-���t����q'�~�w���.��
W��B�������;ł�ۗX��ܾ<���LdZI
uZ���cI����uw��B�xJ���::-���=�N;�p�|�
��q�IU�/��v��"W�T���)��a)��p�"��,�:ODYL����C�w~�>N���(�_��DUv3�ǘ� �6�:�Q�%��2VEIY���Ha���!s�b9�ĝ����N������)}���
?S�"�c��ą��b�L%������Q���H�4�m_"���PXi?hZEJۡ�D�%���ouj�IMB���9�!s��&���*�T�
g3��D���ЩN0>:��GCZ!*搗i.�F^�;\�i<���d�V��+����ޡD�|��O�JQ��PVe
�&4sp��ɂ�Q�P���k���#}o��&�*B����>/��+]��+�Vڸ��DVr�tf㴩N�l�����߰�R�x��G����w���Ѡu�)g��az���\odi�x�p�8�Vx��W��N�qoG�a�"�"Ju�\aR2��K��� ��2��Έ$�)���a"�~ЭH����#�STQb�Mh��D&��h�	�U�Q���l�y��L+���s$2�O��B��|iQQ��rB}�<9��gB�xY,%ͪt6�G����)(}��~/h�������&j޷A���,X~�ꀤ�w�c>����)sr�b���Ĝ�Њ���h�����P҄ 9]򜞃d^�ʁ�c��I�<���MivwC�0��鎅|���gԾ�7tO�s�§a��,ޟO�!��F%#�"Բ*��9&�m����Jle�:����|0�����6`���-h��#���|��@��/�H���'s �L��T��YA��
��p"�G���UfX�ey�7$r z��y,�Z�R��t�d�Z�P4��U��	"J	S{z��{����"Х�����X��T"�,�h���	8�ݿ�Q��b�c���+l<Q��!�V�0*l��J3�`��V����<�_Ts�HѾQk��F&����p���e������4Ìj�P��X˺RW�y����(��,.�><G���(�I��f�C��+an�l�6W�k;�q����0ި.?�!�G�֬�,43�pM7�tV�n�k�,m��q��a? ���W�w'�7��q�;޸55ʯ��C[��_���:�z���e�����zQ�/v���S,���*ѹ��CgX�T�9��i�R&�ŉJ�R��9�"S�-�Ҡ$R�,o�J�6><�Ra� ���E�������/��&��\X�ʬ7� ���8��sksj���PA�K�-����tY'��v��5%V'��b8�,�m7���� �j��68fʀ��}�]���\S�,����wP�i���=7��P��_)l�R�0!���a�0'E'v����u�m.寒�Bg1��+�e����5�����fo�6b�Z��C���o��y���B�ҥeU���	2!c����=�>�"+OA��Ka@�R^��O#؟��o4��/Ѷ\�p�	c�cf�uQ��s�z}�*8݁-W�L���6pbӃ{j|��#�Rs�/���9Le��{&O�m�}�c�E'��=a�ؘ0^���v>�J����.�}�-eьۻ��B��y� �bY>R��۲�A����#�i�3d~xp�ӝ�У!�2�y�Rx��
��Q�F�s�V�Fg���v��\[��D�T��a��"��'&daP����x;���. ��f:c��JW���2gown������d�D����W��c����.6����J��y����r.v��9n�����V��bcn������#�m�5=E���~e�xDA���JnM��w��<���+L�������u��ڒ*c���l�t�o��q}��b�X�o�1c���
���`�-��b�1�Ie|s&����f��(���e�ބ�3��=�x�q ����~�e����0z�Uq ��ʐڼC�h�{a��*K����ذ��o0"]�^��Ivq-��MU���]Ff����/����#�=dw� F!w��"�J���ZA#��}�*����Q�q(��n�)�M��Ŧ� ��K���x ��"�J�����g��4�M�4�h�v��C(��M�	���7S�ۨ(*���%�����4��鶩�=��ԋ\";���"����;�q����'���G�6�uA���,���ԕL$��s��9WI�X����Ea�_3�7�
v���}�=�K��J��r��Fkݼ_��Fq����ƈ]����
ꫲ*�ǅ`�p�cV�R�l�$�F�X�*�����tPz�p}9��A��9^�l�L��M�5f������?�!4�zC�����{�5(pH�d�M�Rch���;��j�"j��n��^g�$f3�,1C���W�b�t����tv��S�cf6e:h5�_��AUBQ��|<�����'Xva gj������ *��=�H�3��*�ޠ�Z�C��O����L�qo<��u^��@qS�a���z����$��;�ˉ�  �i��-��L��'@U4_Y��*��͸~���W�잳)�a�`��c�����N�o�U�߶`�P"X�!4��>}�9�mJ��/Ћ��'̇*Q�~ǥ��Τ(A�p�}W)��arc�3㖻��Ey�s�:�������QS��j��i��9y���Td*�b���m��Q���d`qۗ�T�[˽6T��:��sƘq2�=�j>$�od�WE�z���[�?�P7����/Ec�-�3�칮�b��������쏹+۔������}���}0�q�6vyg+�E�:6��}�C8?�̺`Yk^���9Wa��w�_�y��2���*a�-W�-z��P��^O���_B�8�?�}�m�C����o��GO������]7         *  x�E�Mr�0��u8Ef�b�HX��"ڢ��!�Q�Uo�s�bm����ݽ������+�&J���U�1��o\ߟQv5Jj�t�t4Rw3+:��XyP�<C�Ҝ����w'^��w/#d���GyH��9�Fx��(�Qj4���q8�uB�NIZ�P,3�F��8H�����<�E�~���K�T�Ǫ�S�7��ō�f��Tcro����Kw��7{���ͷ�ӈ���+s�rу�x""�]Y����VB�\
�
��|���?��ژ0�	��t�i���gm�k����d�     