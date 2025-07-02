package com.studentManagement.demo.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "student_table")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int roll_Number;

    @Column(name = "student_name")
    private String name;

    private float percentage;
    private String branch;

    @Column(name = "contact_number")
    private String contactNumber;

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public Student() {
    }

    public int getRoll_Number() {
        return roll_Number;
    }

    public void setRoll_Number(int roll_Number) {
        this.roll_Number = roll_Number;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getPercentage() {
        return percentage;
    }

    public void setPercentage(float percentage) {
        this.percentage = percentage;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }


    // Builder class
    public static class Builder {
        private int roll_Number;
        private String name;
        private float percentage;
        private String branch;
        private String contactNumber;

        public Builder roll_Number(int roll_Number) {
            this.roll_Number = roll_Number;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder percentage(float percentage) {
            this.percentage = percentage;
            return this;
        }

        public Builder branch(String branch) {
            this.branch = branch;
            return this;
        }

        public Builder contactNumber(String contactNumber) {
            this.contactNumber = contactNumber;
            return this;
        }

        public Student build() {
            Student student = new Student();
            student.roll_Number = this.roll_Number;
            student.name = this.name;
            student.percentage = this.percentage;
            student.branch = this.branch;
            student.contactNumber = this.contactNumber;
            return student;
        }

        @Override
        public String toString() {
            return "Builder{" +
                    "roll_Number=" + roll_Number +
                    ", name='" + name + '\'' +
                    ", percentage=" + percentage +
                    ", branch='" + branch + '\'' +
                    ", contactNumber='" + contactNumber + '\'' +
                    '}';
        }
    }
}
