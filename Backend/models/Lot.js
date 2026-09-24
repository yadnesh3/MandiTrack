const mongoose = require("mongoose");

const MANDI_STAGES = [
  "Gate Entry",
  "Token / Lot ID",
  "Queue",
  "Quality Check",
  "Trading / Sale",
  "Weighing",
  "Settlement",
  "Payment",
  "Exit",
];

const checkpointSchema = new mongoose.Schema(
  {
    stage: {
      type: String,
      required: true,
    },
    stageIndex: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["completed", "current", "pending", "skipped"],
      default: "pending",
    },
    timestamp: {
      type: Date,
      default: null,
    },
    officerName: {
      type: String,
      default: "",
    },
    officerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    notes: {
      type: String,
      default: "",
    },
    qualityGrade: {
      type: String,
      default: "",
    },
    actualWeight: {
      type: Number,
      default: null,
    },
    finalPrice: {
      type: Number,
      default: null,
    },
    buyerName: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const lotSchema = new mongoose.Schema(
  {
    lotId: {
      type: String,
      unique: true,
      trim: true,
    },

    tokenNumber: {
      type: String,
      trim: true,
    },

    queueNumber: {
      type: Number,
      default: 1,
    },

    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    crop: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    unit: {
      type: String,
      enum: ["kg", "Quintal", "Ton"],
      default: "kg",
    },

    mandi: {
      type: String,
      required: true,
      trim: true,
    },

    expectedPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    // Legacy status for backward compatibility
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "sold", "completed"],
      default: "pending",
    },

    // Current workflow stage
    currentStage: {
      type: String,
      default: "Queue",
    },

    currentStageIndex: {
      type: Number,
      default: 2,
    },

    checkpoints: [checkpointSchema],

    // Specific stage outcome values
    qualityGrade: {
      type: String,
      default: "", // e.g., "Grade A (Premium)", "Grade B", "Grade C"
    },

    actualWeight: {
      type: Number,
      default: null,
    },

    finalPrice: {
      type: Number,
      default: null, // agreed sale rate per unit
    },

    buyerName: {
      type: String,
      default: "",
    },

    totalAmount: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Processing", "Paid", "Failed"],
      default: "Pending",
    },

    paymentRef: {
      type: String,
      default: "",
    },

    exitStatus: {
      type: String,
      enum: ["Waiting", "Gate Pass Issued", "Exited"],
      default: "Waiting",
    },

    exitTime: {
      type: Date,
      default: null,
    },

    delayed: {
      type: Boolean,
      default: false,
    },

    delayReason: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Helper to initialize full standard checkpoints
lotSchema.methods.initCheckpoints = function (officerName = "Gate Security Officer") {
  const now = new Date();
  this.checkpoints = MANDI_STAGES.map((stage, idx) => ({
    stage,
    stageIndex: idx,
    status: idx < 2 ? "completed" : idx === 2 ? "current" : "pending",
    timestamp: idx < 2 ? now : null,
    officerName: idx < 2 ? officerName : "",
    notes:
      idx === 0
        ? "Farmer gate entry recorded."
        : idx === 1
        ? `Token #${this.tokenNumber} and Lot ID ${this.lotId} generated.`
        : "",
  }));
};

const Lot = mongoose.model("Lot", lotSchema);

module.exports = Lot;
module.exports.MANDI_STAGES = MANDI_STAGES;