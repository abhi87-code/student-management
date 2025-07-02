package com.studentManagement.demo.DTO;

public class StudentRequest {

    private String name;
    private float percentage;
    private String branch;
    private String contactNumber;
    private int roll_Number;



    // Getters and Setters


    public int getRoll_Number() {
        return roll_Number;
    }

    public void setRoll_Number(int roll_Number) {
        this.roll_Number = roll_Number;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public float getPercentage() { return percentage; }
    public void setPercentage(float percentage) { this.percentage = percentage; }

    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }
}
