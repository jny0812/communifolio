import { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
  {
    userId : {
      type: String,
      required: true,
    },
    certificateId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }

);

const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };
