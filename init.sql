CREATE TABLE IF NOT EXISTS dragons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    can_be_traited BOOLEAN NOT NULL,
    is_only_traited BOOLEAN NOT NULL,
    image TEXT,
    slug TEXT UNIQUE,
    hint TEXT,
    date_added DATE
);

INSERT INTO dragons (name, can_be_traited, is_only_traited, image, slug, hint, date_added)
VALUES 
    ('Fire', false, false, 'Fire.webp', 'fire', 'Placeholder', '2011-09-14'),
    ('Plant', false, false, 'Plant.webp', 'plant', 'Placeholder', '2011-09-14'),
    ('Lightning', false, false, 'Lightning.webp', 'lightning', 'Placeholder', '2011-09-14'),
    ('Earth', false, false, 'Earth.webp', 'earth', 'Placeholder', '2011-09-14'),
    ('Cold', false, false, 'Cold.webp', 'cold', 'Placeholder', '2011-09-14'),
    ('Metal', false, false, 'Metal.webp', 'metal', 'Placeholder', '2011-09-14'),
    ('Water', false, false, 'Water.webp', 'water', 'Placeholder', '2011-09-14'),
    ('Air', false, false, 'Air.webp', 'air', 'Placeholder', '2011-09-14'),
    ('Light', false, false, 'Light.webp', 'light', 'Placeholder', '2013-11-05'),
    ('Dark', false, false, 'Dark.webp', 'dark', 'Placeholder', '2013-11-15');

CREATE TABLE IF NOT EXISTS elements (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO elements (name)
VALUES 
    ('Fire'),
    ('Plant'),
    ('Lightning'),
    ('Earth'),
    ('Cold'),
    ('Metal'),
    ('Water'),
    ('Air'),
    ('Light'),
    ('Dark');

CREATE TABLE IF NOT EXISTS dragon_elements (
    dragon_id INTEGER NOT NULL,
    element_id INTEGER NOT NULL,
    PRIMARY KEY (dragon_id, element_id),
    FOREIGN KEY (dragon_id) REFERENCES dragons(id) ON DELETE CASCADE,
    FOREIGN KEY (element_id) REFERENCES elements(id) ON DELETE CASCADE
);

INSERT INTO dragon_elements (dragon_id, element_id)
SELECT d.id, e.id
FROM dragons d
JOIN elements e ON
    (d.slug = 'fire' AND e.name = 'Fire') OR
    (d.slug = 'plant' AND e.name = 'Plant') OR
    (d.slug = 'lightning' AND e.name = 'Lightning') OR
    (d.slug = 'earth' AND e.name = 'Earth') OR
    (d.slug = 'cold' AND e.name = 'Cold') OR
    (d.slug = 'metal' AND e.name = 'Metal') OR
    (d.slug = 'water' AND e.name = 'Water') OR
    (d.slug = 'air' AND e.name = 'Air') OR
    (d.slug = 'light' AND e.name = 'Light') OR
    (d.slug = 'dark' AND e.name = 'Dark');

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_admin BOOLEAN DEFAULT false;
);

CREATE TABLE IF NOT EXISTS user_dragons (
    user_id INTEGER NOT NULL,
    dragon_id INTEGER NOT NULL,
    normal_count INTEGER NOT NULL,
    traited_count INTEGER NOT NULL,
    twin_count INTEGER NOT NULL,
    traited_twin_count INTEGER NOT NULL,
    PRIMARY KEY (user_id, dragon_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (dragon_id) REFERENCES dragons(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS traits (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

INSERT INTO traits (name)
VALUES 
    ('Plant'),
    ('Fire'),
    ('Earth'),
    ('Cold'),
    ('Lightning'),
    ('Water'),
    ('Air'),
    ('Metal'),
    ('Light'),
    ('Dark');

CREATE TABLE IF NOT EXISTS user_traits (
    user_id INTEGER NOT NULL,
    dragon_id INTEGER NOT NULL,
    trait_id INTEGER NOT NULL,
    unlocked BOOLEAN NOT NULL,
    PRIMARY KEY (user_id, dragon_id, trait_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (dragon_id) REFERENCES dragons(id) ON DELETE CASCADE,
    FOREIGN KEY (trait_id) REFERENCES traits(id) ON DELETE CASCADE
);