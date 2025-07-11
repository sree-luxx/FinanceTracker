package com.example.finance_tracker_backend.Controller;


import com.example.finance_tracker_backend.Repository.TransactionRepository;
import com.example.finance_tracker_backend.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = {"http://localhost:3000", "http://frontend:3000"})
public class TransactionController {

    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @PostMapping
    public Transaction createTransaction(@RequestBody Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable Long id) {
        return transactionRepository.findById(id)
                .map(transaction -> ResponseEntity.ok().body(transaction))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> updateTransaction(@PathVariable Long id, @RequestBody Transaction transactionDetails) {
        return transactionRepository.findById(id)
                .map(transaction -> {
                    transaction.setDescription(transactionDetails.getDescription());
                    transaction.setAmount(transactionDetails.getAmount());
                    transaction.setCategory(transactionDetails.getCategory());
                    transaction.setType(transactionDetails.getType());
                    transaction.setDate(transactionDetails.getDate());
                    Transaction updatedTransaction = transactionRepository.save(transaction);
                    return ResponseEntity.ok().body(updatedTransaction);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTransaction(@PathVariable Long id) {
        return transactionRepository.findById(id)
                .map(transaction -> {
                    transactionRepository.delete(transaction);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/summary")
    public ResponseEntity<List<Transaction>> getTransactionsByType(@RequestParam String type) {
        return ResponseEntity.ok(transactionRepository.findByType(type));
    }
}