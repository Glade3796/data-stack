import Database from "better-sqlite3";
const db = new Database("database.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS place
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_firstname TEXT,
    user_surname TEXT,
    user_message TEXT,
    user_colour TEXT,
    sentiment TEXT,
    likes INT
)
`);

db.exec(`INSERT INTO place (
    user_firstname ,
    user_surname ,
    user_message ,
    user_colour ,
    sentiment ,
    likes 
) VALUES 
('John', 'Doe', 'Beautiful view!', '#3366CC', 'inspiring', 4)
,('Jane', 'Smith', 'Lovely atmosphere.', '#FF6699', 'loving', 6)
,('Alice', 'Johnson', 'Hopeful vibes here.', '#66CC66', 'hopeful', 12)
,('Bob', 'Williams', 'Kind people around.', '#FF9900', 'kind', 8)
,('Charlie', 'Brown', 'Disappointed with the location.', '#333333', 'inspiring', 3)
,('Eva', 'Miller', 'Feeling the love for this place!', '#9933CC', 'loving', 20)
,('Frank', 'Davis', 'A hopeful place to be.', '#FF6600', 'hopeful', 9)
,('Grace', 'Jones', 'Kindness everywhere.', '#FFCCCC', 'kind', 11)
,('Henry', 'Clark', 'Inspiring landscapes.', '#996633', 'inspiring', 18)
,('Ivy', 'Moore', 'Hopeful for positive changes.', '#999999', 'hopeful', 7)
,('Jack', 'Taylor', 'A loving community.', '#CC3366', 'loving', 13)
,('Karen', 'White', 'Kind gestures make this place special.', '#66CC99', 'kind', 6)
,('Leo', 'Harris', 'Inspired by the people here.', '#FF3300', 'inspiring', 15)
,('Mia', 'Roberts', 'A hopeful journey begins here.', '#9966CC', 'hopeful', 11)
,('Nathan', 'Miller', 'Loving the positive vibes.', '#FF9966', 'loving', 17)
,('Olivia', 'Brown', 'Kindness is the theme.', '#336699', 'kind', 8)
,('Paul', 'Smith', 'Inspired by the surroundings.', '#FF6633', 'inspiring', 12)
,('Quinn', 'Jones', 'A hopeful place for dreamers.', '#6699CC', 'hopeful', 10)
,('Rachel', 'Davis', 'Loving every moment here.', '#FFCC00', 'loving', 16)
,('Sam', 'Johnson', 'Kindness is the key.', '#336600', 'kind', 5)
,('Tom', 'Evans', 'Inspiring and motivating.', '#FF6600', 'inspiring', 14)
,('Ursula', 'Garcia', 'Hopeful for a brighter future.', '#666699', 'hopeful', 90)
,('Victor', 'Lopez', 'Loving the positive energy.', '#CC3333', 'loving', 20)
,('Wendy', 'Taylor', 'Kind people, kind place.', '#339966', 'kind', 70)
,('Xavier', 'Hill', 'Inspiration at every corner.', '#FF3366', 'inspiring', 10)
,('Yvonne', 'Smith', 'A hopeful atmosphere.', '#669933', 'hopeful', 8)
,('Zachary', 'White', 'Feeling loved and appreciated.', '#FF9933', 'loving', 15)
,('Amy', 'Harris', 'Kindness knows no bounds.', '#3366FF', 'kind', 60)
,('Ben', 'Miller', 'Inspiring moments everywhere.', '#FF3399', 'inspiring', 13)
,('Cathy', 'Clark', 'Hopeful for positive changes.', '#6666CC', 'hopeful', 1)`);
