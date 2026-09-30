ALTER TABLE admin_users
  ADD COLUMN IF NOT EXISTS display_name VARCHAR(80) NOT NULL DEFAULT '';

UPDATE admin_users
SET display_name = split_part(email, '@', 1)
WHERE display_name = '';