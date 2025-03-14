CREATE TABLE dragons (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
    can_be_traited BOOLEAN NOT NULL,
    is_only_traited BOOLEAN NOT NULL,
);

INSERT INTO dragons (id, name, can_be_traited, is_only_traited)
VALUES 
    (1, 'Fire', false, false),
    (2, 'Plant', false, false),
    (3, 'Lightning', false, false),
    (4, 'Earth', false, false),
    (5, 'Cold', false, false),
    (6, 'Metal', false, false),
    (7, 'Water', false, false),
    (8, 'Air', false, false),
    (9, 'Light', false, false),
    (10, 'Dark', false, false);

CREATE TABLE elements (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL
);

INSERT INTO elements (id, name)
VALUES 
    (1, 'Fire'),
    (2, 'Plant'),
    (3, 'Lightning'),
    (4, 'Earth'),
    (5, 'Cold'),
    (6, 'Metal'),
    (7, 'Water'),
    (8, 'Air'),
    (9, 'Light'),
    (10, 'Dark');

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