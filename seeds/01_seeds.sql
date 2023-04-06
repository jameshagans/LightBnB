
INSERT INTO users (name, email, password)
VALUES('Eva Stanley','sebastianguerra@ymail.com',' $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
 ), ('Louisa Meyer ','jacksonrose@hotmail.com',' $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
 ),('Dominic Parks ','victoriablackwell@outlook.com',' $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
 );


INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES(1, 'speed lamp', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 550, 4,4,8, 'Canada', '536 Namsub Highway','Sotboske', 'Quebec', '28142', true ), (1, 'Blank corner ', 'description2', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 930, 6,5,3, 'Canada', '123 Ross Street','Vancouver', 'BC', '132456', true ),(2, 'Habit Mix', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 450, 2,3,3, 'Canada', '1650 Hejto center','Genwezuj', 'Newfoundland And Labrador', '44583', true );


INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-26', 5, 2),
('2019-01-04', '2019-02-01', 4, 3),
('2021-10-01', '2021-10-14', 6, 1);

INSERT INTO property_reviews  (guest_id, property_id, reservation_id, rating, message)
VALUES(2,5,10, 3, 'Could have been cleaner'), 
(3, 4, 11, 4, 'Very Nice!'), 
(1, 6, 12, 4, 'Awesome place!');
