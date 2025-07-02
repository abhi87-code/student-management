package com.studentManagement.demo.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GetBookByIdResponse {

    @JsonProperty("roll_number")
    private int roll_Number;

    @JsonProperty("name")
    private String name;

    @JsonProperty("percentage")
    private float percentage;

    @JsonProperty("branch")
    private String branch;

    // --- Getters and Setters ---
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

    // --- Builder Pattern ---
    public static class Builder {
        private int roll_Number;
        private String name;
        private float percentage;
        private String branch;

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

        public GetBookByIdResponse build() {
            GetBookByIdResponse response = new GetBookByIdResponse();
            response.setRoll_Number(this.roll_Number);
            response.setName(this.name);
            response.setPercentage(this.percentage);
            response.setBranch(this.branch);
            return response;
        }
    }
}
