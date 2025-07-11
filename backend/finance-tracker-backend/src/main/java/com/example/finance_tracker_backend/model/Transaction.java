package com.example.finance_tracker_backend.model;

import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDate;

    @Data
    @Entity
    @Table(name = "transactions")
    public class Transaction {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String description;
        private double amount;
        private String category;
        private String type;
        private LocalDate date;
    }

