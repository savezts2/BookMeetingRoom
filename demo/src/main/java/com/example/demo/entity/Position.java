package com.example.demo.entity;


import lombok.*;

import javax.persistence.*;

@Entity
@Data
@Setter
@Getter
@NoArgsConstructor
@EqualsAndHashCode
public class Position {


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long position_id;

    private String positions;

    private String isActive;

    public String getIsActive() {
        return isActive;
    }

    public void setIsActive(String isActive) {
        this.isActive = isActive;
    }

    public Long getPosition_id() {
        return position_id;
    }

    public void setPosition_id(Long position_id) {
        this.position_id = position_id;
    }

    public String getPositions() {
        return positions;
    }

    public void setPositions(String positions) {
        this.positions = positions;
    }
}
