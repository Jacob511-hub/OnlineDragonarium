CREATE TABLE dragons (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
    can_be_traited BOOLEAN NOT NULL,
    is_only_traited BOOLEAN NOT NULL,
);

INSERT INTO dragons (id, name, can_be_traited, is_only_traited, image, slug, hint, date_added)
VALUES 
    (DEFAULT, 'Fire', false, false, 'Fire.webp', 'fire', 'Placeholder', '2011-09-14'),
    (DEFAULT, 'Plant', false, false, 'Plant.webp', 'plant', 'Placeholder', '2011-09-14'),
    (DEFAULT, 'Lightning', false, false, 'Lightning.webp', 'lightning', 'Placeholder', '2011-09-14'),
    (DEFAULT, 'Earth', false, false, 'Earth.webp', 'earth', 'Placeholder', '2011-09-14'),
    (DEFAULT, 'Cold', false, false, 'Cold.webp', 'cold', 'Placeholder', '2011-09-14'),
    (DEFAULT, 'Metal', false, false, 'Metal.webp', 'metal', 'Placeholder', '2011-09-14'),
    (DEFAULT, 'Water', false, false, 'Water.webp', 'water', 'Placeholder', '2011-09-14'),
    (DEFAULT, 'Air', false, false, 'Air.webp', 'air', 'Placeholder', '2011-09-14'),
    (DEFAULT, 'Light', false, false, 'Light.webp', 'light', 'Placeholder', '2013-11-05'),
    (DEFAULT, 'Dark', false, false, 'Dark.webp', 'dark', 'Placeholder', '2013-11-15');

CREATE TABLE elements (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL
);

INSERT INTO elements (id, name)
VALUES 
    (DEFAULT, 'Fire'),
    (DEFAULT, 'Plant'),
    (DEFAULT, 'Lightning'),
    (DEFAULT, 'Earth'),
    (DEFAULT, 'Cold'),
    (DEFAULT, 'Metal'),
    (DEFAULT, 'Water'),
    (DEFAULT, 'Air'),
    (DEFAULT, 'Light'),
    (DEFAULT, 'Dark');

CREATE TABLE dragon_elements (
    dragon_id INTEGER NOT NULL,
    element_id INTEGER NOT NULL,
    PRIMARY KEY (dragon_id, element_id),
    CONSTRAINT fk_dragon FOREIGN KEY (dragon_id) 
        REFERENCES dragons(id) ON DELETE CASCADE,
    CONSTRAINT fk_element FOREIGN KEY (element_id) 
        REFERENCES elements(id) ON DELETE CASCADE
);

INSERT INTO dragon_elements (dragon_id, element_id)
SELECT d.id, e.id
FROM dragons d, elements e
WHERE d.slug = 'fire' AND e.name = 'Fire'
   OR d.slug = 'plant' AND e.name = 'Plant'
   OR d.slug = 'lightning' AND e.name = 'Lightning'
   OR d.slug = 'earth' AND e.name = 'Earth'
   OR d.slug = 'cold' AND e.name = 'Cold'
   OR d.slug = 'metal' AND e.name = 'Metal'
   OR d.slug = 'water' AND e.name = 'Water'
   OR d.slug = 'air' AND e.name = 'Air'
   OR d.slug = 'light' AND e.name = 'Light'
   OR d.slug = 'dark' AND e.name = 'Dark';

CREATE TABLE user_dragons (
    user_id INTEGER NOT NULL,
    dragon_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, dragon_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) 
        REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_dragon FOREIGN KEY (dragon_id) 
        REFERENCES dragons(id) ON DELETE CASCADE,
    normal_count INTEGER NOT NULL,
    traited_count INTEGER NOT NULL,
    twin_count INTEGER NOT NULL,
    traited_twin_count INTEGER NOT NULL
);

CREATE TABLE traits (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL
);

INSERT INTO traits (id, name)
VALUES 
    (DEFAULT, 'Plant'),
    (DEFAULT, 'Fire'),
    (DEFAULT, 'Earth'),
    (DEFAULT, 'Cold'),
    (DEFAULT, 'Lightning'),
    (DEFAULT, 'Water'),
    (DEFAULT, 'Air'),
    (DEFAULT, 'Metal'),
    (DEFAULT, 'Light'),
    (DEFAULT, 'Dark');
    
CREATE TABLE user_traits (
    user_id INTEGER NOT NULL,
    dragon_id INTEGER NOT NULL,
    trait_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, dragon_id, trait_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) 
        REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_dragon FOREIGN KEY (dragon_id) 
        REFERENCES dragons(id) ON DELETE CASCADE,
    CONSTRAINT fk_trait FOREIGN KEY (trait_id) 
        REFERENCES traits(id) ON DELETE CASCADE,
    unlocked BOOLEAN NOT NULL
);