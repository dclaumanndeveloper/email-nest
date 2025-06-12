CREATE TYPE "public"."biography_type" AS ENUM('Biography', 'Release');--> statement-breakpoint
CREATE TYPE "public"."file_type" AS ENUM('docx', 'PDF');--> statement-breakpoint
CREATE TYPE "public"."account_type" AS ENUM('savings', 'checking');--> statement-breakpoint
CREATE TYPE "public"."bank_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."pix_status" AS ENUM('accepted', 'rejected', 'pending');--> statement-breakpoint
CREATE TYPE "public"."pix_type" AS ENUM('email', 'telephone', 'document', 'random');--> statement-breakpoint
CREATE TYPE "public"."status_change_request" AS ENUM('Pending', 'Concluded');--> statement-breakpoint
CREATE TYPE "public"."file_music_type" AS ENUM('Image', 'Audio');--> statement-breakpoint
CREATE TYPE "public"."contract_status" AS ENUM('Pending', 'Concluded', 'Waiting for signature');--> statement-breakpoint
CREATE TYPE "public"."contract_type" AS ENUM('exclusive', 'unique');--> statement-breakpoint
CREATE TYPE "public"."image_type" AS ENUM('References', 'Primary Artists', 'Featuring Artists');--> statement-breakpoint
CREATE TYPE "public"."version" AS ENUM('Studio', 'Live', 'Acoustic', 'Remix', 'Extended Version');--> statement-breakpoint
CREATE TYPE "public"."invite_status" AS ENUM('pending', 'accepted', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."person_type" AS ENUM('physical', 'legal');--> statement-breakpoint
CREATE TYPE "public"."social_type" AS ENUM('CPF', 'Passport', 'CAE', 'IPI', 'CNPJ');--> statement-breakpoint
CREATE TYPE "public"."songwriter_contract_type" AS ENUM('Exclusive', 'By Work');--> statement-breakpoint
CREATE TYPE "public"."songwriter_new_music" AS ENUM('Yes', 'No', 'I dont know');--> statement-breakpoint
CREATE TYPE "public"."content_type" AS ENUM('Audio', 'Video');--> statement-breakpoint
CREATE TYPE "public"."languages" AS ENUM('Português (Brasil)', 'Afrikaans', 'Alemão', 'Amárico', 'Árabe', 'Armênio', 'Azerbaijano', 'Basco', 'Bengali', 'Búlgaro', 'Cantonês', 'Catalão', 'Coreano', 'Croata', 'Dinamarquês', 'Eslovaco', 'Esloveno', 'Espanhol', 'Espanhol (Espanha)', 'Espanhol (México)', 'Espanhol (Argentina)', 'Espanhol (Colômbia)', 'Espanhol (Chile)', 'Espanhol (Peru)', 'Espanhol (Venezuela)', 'Espanhol (Equador)', 'Espanhol (Cuba)', 'Espanhol (República Dominicana)', 'Espanhol (Panamá)', 'Espanhol (Uruguai)', 'Espanhol (Paraguai)', 'Espanhol (Costa Rica)', 'Espanhol (Bolívia)', 'Espanhol (Honduras)', 'Espanhol (Nicarágua)', 'Espanhol (El Salvador)', 'Espanhol (Guatemala)', 'Espanhol (Puerto Rico)', 'Filipino', 'Finlandês', 'Francês', 'Galego', 'Georgiano', 'Grego', 'Guarani', 'Gujarati', 'Hebraico', 'Hindi', 'Holandês', 'Húngaro', 'Indonésio', 'Inglês', 'Inglês (EUA)', 'Inglês (Reino Unido)', 'Inglês (Austrália)', 'Inglês (Canadá)', 'Inglês (Irlanda)', 'Inglês (Nova Zelândia)', 'Islandês', 'Italiano', 'Japonês', 'Javanês', 'Kannada', 'Khmer Central', 'Lao', 'Latim', 'Letão', 'Lituano', 'Malaiala', 'Malaio', 'Mandarim', 'Marathi', 'Nepalês', 'Norueguês', 'Pig Latin', 'Polonês', 'Português', 'Português (Portugal)', 'Português (Angola)', 'Português (Moçambique)', 'Português (Cabo Verde)', 'Português (Guiné-Bissau)', 'Português (São Tomé e Príncipe)', 'Português (Timor-Leste)', 'Português (Macau)', 'Romeno', 'Russo', 'Sérvio', 'Sinhalês', 'Sueco', 'Sundanês', 'Swahili', 'Taiwan Tradicional', 'Tamil', 'Tcheco', 'Telugu', 'Thai (Tailândia)', 'Turco', 'Ucraniano', 'Urdu', 'Vietnamita', 'Yue', 'Zulu');--> statement-breakpoint
CREATE TYPE "public"."release_format" AS ENUM('Single', 'EP', 'Album');--> statement-breakpoint
CREATE TYPE "public"."release_status" AS ENUM('pending', 'pending validation', 'validated', 'distribuited', 'blocked', 'correction');--> statement-breakpoint
CREATE TYPE "public"."token_type" AS ENUM('Password Recovery', 'Google');--> statement-breakpoint
CREATE TYPE "public"."is_explicit_enum" AS ENUM('Sim', 'Não', 'Versão Limpa');--> statement-breakpoint
CREATE TYPE "public"."track_type" AS ENUM('Original', 'Cover', 'Cover by cover artist', 'Medley', 'Karaoke');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('owner', 'admin', 'manager', 'editor', 'user');--> statement-breakpoint
CREATE TYPE "public"."user_status" AS ENUM('active', 'inactive', 'deleted', 'waiting');--> statement-breakpoint
CREATE TABLE "artists" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"need_create_platforms" boolean DEFAULT false NOT NULL,
	"spotify_link" text[] NOT NULL,
	"apple_link" text[],
	"deezer_link" text[],
	"youtube_link" text[],
	"facebook_link" text[],
	"tiktok_link" text[],
	"instagram_link" text[],
	"org_id" text NOT NULL,
	"others_link" text[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "artists_biographys" (
	"id" text PRIMARY KEY NOT NULL,
	"type" "biography_type" NOT NULL,
	"content" text,
	"file" text,
	"artist_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"file_type" "file_type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "artists_members" (
	"id" text PRIMARY KEY NOT NULL,
	"person_id" text NOT NULL,
	"artist_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "banks" (
	"id" text PRIMARY KEY NOT NULL,
	"social_number" text NOT NULL,
	"user_id" text NOT NULL,
	"is_favorite" boolean DEFAULT true,
	"agency" text,
	"bank_code" text,
	"bank_name" text,
	"account" text,
	"account_type" text,
	"holder" text NOT NULL,
	"pix_type" text,
	"pix_status" "pix_status" NOT NULL,
	"bank_status" "bank_status" NOT NULL,
	"pix" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "changes_requests" (
	"id" text PRIMARY KEY NOT NULL,
	"release_id" text NOT NULL,
	"subject" text NOT NULL,
	"details" text NOT NULL,
	"status" "status_change_request" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "changes_requests_attachments" (
	"id" text PRIMARY KEY NOT NULL,
	"change_request_id" text NOT NULL,
	"file_music_type" "file_music_type" NOT NULL,
	"download_link" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contracts" (
	"id" text PRIMARY KEY NOT NULL,
	"agreements" text NOT NULL,
	"release_id" text,
	"user_id" text,
	"active" boolean DEFAULT true NOT NULL,
	"token_type" "contract_type" DEFAULT 'exclusive',
	"status" "contract_status" DEFAULT 'Pending',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "covers_requests" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text,
	"release_id" text NOT NULL,
	"briefing" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "cover_requests_attachments" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text,
	"cover_request_id" text NOT NULL,
	"image_type" "image_type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "genres" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "invites" (
	"id" text PRIMARY KEY NOT NULL,
	"who_invite_id" text NOT NULL,
	"guest_id" text NOT NULL,
	"organization_id" text NOT NULL,
	"invite_status" "invite_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "licensors" (
	"id" text PRIMARY KEY NOT NULL,
	"licensor_pseudonym" text,
	"contract_id" text,
	"licensor_name" text,
	"licensor_phone" text,
	"licensor_email" text,
	"licensor_marital_status" text,
	"licensor_birthday" text,
	"licensor_cpf" text,
	"licensor_rg" text,
	"licensor_zip_code" text,
	"licensor_address" text,
	"licensor_number" text,
	"licensor_complement" text,
	"licensor_neighborhood" text,
	"licensor_city" text,
	"licensor_state" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "musical_instruments" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"is_global" boolean DEFAULT true,
	"action" text,
	"type" text,
	"user_id" text,
	"expire_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organizations_members" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"user_id" text NOT NULL,
	"role" "role" DEFAULT 'user' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "persons" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"full_name" text,
	"position" text,
	"pseudonym" text,
	"corporate_name" text,
	"trade_name" text,
	"social_type" "social_type",
	"document_number" text NOT NULL,
	"email" text,
	"rg" text,
	"marital_status" text,
	"person_type" "person_type" NOT NULL,
	"birthday" timestamp,
	"org_id" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	"songwriter_contract_type" "songwriter_contract_type",
	"songwriter_new_music" "songwriter_new_music" DEFAULT 'No' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pitchs" (
	"id" text PRIMARY KEY NOT NULL,
	"is_pitch" boolean DEFAULT false,
	"release_id" text NOT NULL,
	"file" text,
	"content" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"is_song" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "read_notifications" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"notification_id" text NOT NULL,
	"read_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "releases" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"subtitle" text,
	"org_id" text NOT NULL,
	"content_type" "content_type" NOT NULL,
	"status" "release_status" DEFAULT 'pending' NOT NULL,
	"format" "release_format" NOT NULL,
	"catalog_number" text,
	"is_new_music_catalog" boolean DEFAULT false,
	"language_title" text NOT NULL,
	"genre" text NOT NULL,
	"sub_genre" text NOT NULL,
	"version" "version" NOT NULL,
	"release_date" timestamp NOT NULL,
	"release_original_date" timestamp,
	"record_year" text NOT NULL,
	"release_year" text NOT NULL,
	"stamp_id" text NOT NULL,
	"p_line" text NOT NULL,
	"c_line" text NOT NULL,
	"upc_ean" text,
	"is_meta_tiktok_release" boolean DEFAULT false,
	"meta_tiktok_release_date" timestamp,
	"link_cover" text NOT NULL,
	"user_id" text,
	"hour_release" text
);
--> statement-breakpoint
CREATE TABLE "releases_artists" (
	"id" text PRIMARY KEY NOT NULL,
	"featuring" boolean DEFAULT false,
	"artist_id" text NOT NULL,
	"release_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stamps" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"org_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subgenres" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"is_active" boolean DEFAULT true,
	"genre_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "tokens" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"type" "token_type" NOT NULL,
	"token" text NOT NULL,
	"refresh_token" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"expired_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "tracks" (
	"id" text PRIMARY KEY NOT NULL,
	"release_id" text NOT NULL,
	"title" text NOT NULL,
	"subtitle" text,
	"title_language" text,
	"content_type" text,
	"track_type" "track_type" NOT NULL,
	"version" "version" NOT NULL,
	"is_instrumental" boolean DEFAULT false,
	"accept_term_isrc" boolean,
	"is_edit_track" boolean DEFAULT false,
	"isrc_code" text,
	"iswc_code" text,
	"preview_time" time,
	"genre" text,
	"sub_genre" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	"track_file" text,
	"lyrics" text,
	"is_explicit" "is_explicit_enum" DEFAULT 'Não',
	"lyrics_language" text,
	"is_abramus" boolean DEFAULT false,
	"is_backoffice" boolean DEFAULT false,
	"is_international" boolean DEFAULT false,
	"is_completed" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "tracks_copyrights" (
	"id" text PRIMARY KEY NOT NULL,
	"tracks_id" text NOT NULL,
	"file_link" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "tracks_members" (
	"id" text PRIMARY KEY NOT NULL,
	"isFeaturing" boolean DEFAULT false,
	"artist_id" text,
	"tracks_id" text NOT NULL,
	"person_id" text,
	"percentage" text,
	"assignment" text,
	"instruments" text[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "sessions" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "tasks" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "sessions" CASCADE;--> statement-breakpoint
DROP TABLE "tasks" CASCADE;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password_hash" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "avatar" text DEFAULT 'https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "terms_and_privacy" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "request_service" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "newsletter" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "user_status" "user_status" DEFAULT 'waiting' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "role" DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE "artists" ADD CONSTRAINT "artists_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artists_biographys" ADD CONSTRAINT "artists_biographys_artist_id_artists_id_fk" FOREIGN KEY ("artist_id") REFERENCES "public"."artists"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artists_members" ADD CONSTRAINT "artists_members_person_id_persons_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."persons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artists_members" ADD CONSTRAINT "artists_members_artist_id_artists_id_fk" FOREIGN KEY ("artist_id") REFERENCES "public"."artists"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "banks" ADD CONSTRAINT "banks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "changes_requests" ADD CONSTRAINT "changes_requests_release_id_releases_id_fk" FOREIGN KEY ("release_id") REFERENCES "public"."releases"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "changes_requests_attachments" ADD CONSTRAINT "changes_requests_attachments_change_request_id_changes_requests_id_fk" FOREIGN KEY ("change_request_id") REFERENCES "public"."changes_requests"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_release_id_releases_id_fk" FOREIGN KEY ("release_id") REFERENCES "public"."releases"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "covers_requests" ADD CONSTRAINT "covers_requests_release_id_releases_id_fk" FOREIGN KEY ("release_id") REFERENCES "public"."releases"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cover_requests_attachments" ADD CONSTRAINT "cover_requests_attachments_cover_request_id_covers_requests_id_fk" FOREIGN KEY ("cover_request_id") REFERENCES "public"."covers_requests"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invites" ADD CONSTRAINT "invites_who_invite_id_users_id_fk" FOREIGN KEY ("who_invite_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invites" ADD CONSTRAINT "invites_guest_id_users_id_fk" FOREIGN KEY ("guest_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invites" ADD CONSTRAINT "invites_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "licensors" ADD CONSTRAINT "licensors_contract_id_contracts_id_fk" FOREIGN KEY ("contract_id") REFERENCES "public"."contracts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organizations_members" ADD CONSTRAINT "organizations_members_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organizations_members" ADD CONSTRAINT "organizations_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "persons" ADD CONSTRAINT "persons_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "persons" ADD CONSTRAINT "persons_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pitchs" ADD CONSTRAINT "pitchs_release_id_releases_id_fk" FOREIGN KEY ("release_id") REFERENCES "public"."releases"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "read_notifications" ADD CONSTRAINT "read_notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "read_notifications" ADD CONSTRAINT "read_notifications_notification_id_notifications_id_fk" FOREIGN KEY ("notification_id") REFERENCES "public"."notifications"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "releases" ADD CONSTRAINT "releases_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "releases" ADD CONSTRAINT "releases_stamp_id_stamps_id_fk" FOREIGN KEY ("stamp_id") REFERENCES "public"."stamps"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "releases" ADD CONSTRAINT "releases_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "releases_artists" ADD CONSTRAINT "releases_artists_artist_id_artists_id_fk" FOREIGN KEY ("artist_id") REFERENCES "public"."artists"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "releases_artists" ADD CONSTRAINT "releases_artists_release_id_releases_id_fk" FOREIGN KEY ("release_id") REFERENCES "public"."releases"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stamps" ADD CONSTRAINT "stamps_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subgenres" ADD CONSTRAINT "subgenres_genre_id_genres_id_fk" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_release_id_releases_id_fk" FOREIGN KEY ("release_id") REFERENCES "public"."releases"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tracks_copyrights" ADD CONSTRAINT "tracks_copyrights_tracks_id_tracks_id_fk" FOREIGN KEY ("tracks_id") REFERENCES "public"."tracks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tracks_members" ADD CONSTRAINT "tracks_members_artist_id_artists_id_fk" FOREIGN KEY ("artist_id") REFERENCES "public"."artists"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tracks_members" ADD CONSTRAINT "tracks_members_tracks_id_tracks_id_fk" FOREIGN KEY ("tracks_id") REFERENCES "public"."tracks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tracks_members" ADD CONSTRAINT "tracks_members_person_id_persons_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."persons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "title_idx" ON "releases" USING btree ("title");--> statement-breakpoint
CREATE INDEX "version_idx" ON "releases" USING btree ("version");--> statement-breakpoint
CREATE INDEX "release_date_idx" ON "releases" USING btree ("release_date");--> statement-breakpoint
CREATE INDEX "status_idx" ON "releases" USING btree ("status");--> statement-breakpoint
CREATE INDEX "org_id_idx" ON "releases" USING btree ("org_id");--> statement-breakpoint
CREATE INDEX "release_artists_id_idx" ON "releases_artists" USING btree ("release_id");--> statement-breakpoint
CREATE INDEX "title_track_idx" ON "tracks" USING btree ("title");--> statement-breakpoint
CREATE INDEX "version_track_idx" ON "tracks" USING btree ("version");--> statement-breakpoint
CREATE INDEX "release_track_id_idx" ON "tracks" USING btree ("release_id");--> statement-breakpoint
CREATE INDEX "is_active_idx" ON "tracks" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "id_track_idx" ON "tracks_copyrights" USING btree ("id");--> statement-breakpoint
CREATE INDEX "track_id_copyrights_idx" ON "tracks_copyrights" USING btree ("tracks_id");--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "is_active";--> statement-breakpoint
DROP TYPE "public"."task_status_enum";