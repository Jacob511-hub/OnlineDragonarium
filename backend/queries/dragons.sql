CREATE TABLE dragons (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
    can_be_traited BOOLEAN NOT NULL,
    is_only_traited BOOLEAN NOT NULL,
);

INSERT INTO dragons (id, name, can_be_traited, is_only_traited, image, slug, hint)
VALUES 
    (DEFAULT, 'Fire', false, false, 'Fire.webp', 'fire', 'Placeholder'),
    (DEFAULT, 'Plant', false, false, 'Plant.webp', 'plant', 'Placeholder'),
    (DEFAULT, 'Lightning', false, false, 'Lightning.webp', 'lightning', 'Placeholder'),
    (DEFAULT, 'Earth', false, false, 'Earth.webp', 'earth', 'Placeholder'),
    (DEFAULT, 'Cold', false, false, 'Cold.webp', 'cold', 'Placeholder'),
    (DEFAULT, 'Metal', false, false, 'Metal.webp', 'metal', 'Placeholder'),
    (DEFAULT, 'Water', false, false, 'Water.webp', 'water', 'Placeholder'),
    (DEFAULT, 'Air', false, false, 'Air.webp', 'air', 'Placeholder'),
    (DEFAULT, 'Light', false, false, 'Light.webp', 'light', 'Placeholder'),
    (DEFAULT, 'Dark', false, false, 'Dark.webp', 'dark', 'Placeholder');

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
VALUES 
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 6),
    (7, 7),
    (8, 8),
    (9, 9),
    (10, 10);

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
    (1, 'Plant'),
    (2, 'Fire'),
    (3, 'Earth'),
    (4, 'Cold'),
    (5, 'Lightning'),
    (6, 'Water'),
    (7, 'Air'),
    (8, 'Metal'),
    (9, 'Light'),
    (10, 'Dark');
    
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