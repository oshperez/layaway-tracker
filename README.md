# Layaway Tracker

## Description

This app allows users to manage layaway purchases by creating, updating, and deleting layaways and customers. Each layaway is linked to a customer, enabling payment tracking, access to payment history, and clear visibility of purchase progress. The app also includes reminders, authentication, and organized data views.

## Project Features

- [x] **Full CRUD functionality for layaways**
  - New layaway entries can be created, modified, or removed
  - Every layaway must be associated with a customer

- [x] **Full CRUD functionality for customers**
  - Customer profiles can be created, updated, and deleted
  - Each customer can have multiple associated layaways

- [x] **Customer–layaway relationship**
  - Layaways are strictly linked to customers
  - All layaways belonging to a specific customer can be viewed in one place

- [x] **Payment tracking system**
  - Payments can be recorded for each layaway
  - Multiple payment methods are supported (card, cash, or other)
  - A complete payment history is maintained per layaway

- [x] **Payment history views**
  - Detailed payment history is available for each layaway
  - Customer-level transaction history provides a broader financial overview

- [x] **Payment reminders**
  - Reminders can be set for upcoming or overdue payments

- [x] **Pagination for layaways**
  - Layaway records are paginated to improve performance and usability
  - Navigation across multiple pages of data is supported

- [x] **Authentication**
  - Secure login and logout functionality

## Video Walkthrough

<div>
    <a href="https://www.loom.com/share/86caddbf8672482898f6390264cdf974">
      <p>Layaway Tracker - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/86caddbf8672482898f6390264cdf974">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/86caddbf8672482898f6390264cdf974-f58a8208cb42a6d6-full-play.gif#t=0.1">
    </a>
  </div>

## Notes

**Challenging part:** Designing the relationship between customers and layaways while ensuring data integrity—particularly enforcing that each layaway must be linked to a customer. Managing payment history, reminders, and maintaining a clean user experience with pagination and authentication also required careful handling of state and data flow.
